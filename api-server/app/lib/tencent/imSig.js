/**
 * @description 腾讯云签名校验工具类
 * @author yq
 * @date 2016/12/22 上午10:39.
 */
const crypto = require('crypto');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const Base64 = require('./base64');
const config = require('../../../config/global');
const CacheFactory = require('../cacheFactory');

const { sdkAppId, accountType, appIdAt3rd, identifier,
  expireAfter, privateKeyFile, publicKeyFile } = config.im;
const privateKey = fs.readFileSync(path.join(__dirname, '../../../', privateKeyFile)).toString();
const publicKey = fs.readFileSync(path.join(__dirname, '../../../', publicKeyFile)).toString();

// 加密key 严格按顺序排列
const KEYS = [
  'TLS.appid_at_3rd',
  'TLS.account_type',
  'TLS.identifier',
  'TLS.sdk_appid',
  'TLS.time',
  'TLS.expire_after',
];

/**
 * sdkAppId, accountType, appIdAt3rd, identifier, expireAfter
 * 根据json内容生成需要签名的字符串 失败时返回false
 * @param {String} data 用以获取签名的json对象
 * @returns {String}
 * @public
 */
function genSignContent(data) {
  let content = '';
  for (let i = 0; i < KEYS.length; i += 1) {
    content += `${KEYS[i]}:${data[KEYS[i]]}\n`;
  }
  return content;
}

/**
 * ECDSA-SHA256签名
 * @param {String} content 需要签名的字符串
 * @return {String} 返回签名 失败时返回false
 */
function sign(content) {
  return crypto.createSign('sha256')
    .update(content, 'utf8')
    .sign(privateKey, 'base64');
}

/**
 * 验证ECDSA-SHA256签名
 * @param {String} str 需要验证的数据原文
 * @param {String} checkSign 需要验证的签名
 * @return {Boolean} 1验证成功 0验证失败
 */
function verify(str, checkSign) {
  return crypto.createVerify('sha256')
    .update(str, 'utf8')
    .verify(publicKey, checkSign, 'base64');
}

class ImSig {
  /**
   * 缓存策略获取sig
   * @param {String} name
   * @param {Boolean} cache 是否缓存
   * @returns {Promise}
   */
  static getCacheSig(name, cache = false) {
    // 非生产环境不缓存key
    if (process.env.NODE_ENV !== 'production') {
      return Promise.resolve(ImSig.genSig(name));
    }
    const sigKey = `im:sig:${name}`;
    return CacheFactory.get(sigKey)
      .then((userSig) => {
        if (userSig) {
          return userSig;
        }
        const newUserSig = ImSig.genSig(name);
        // 异步存储 失效时间设为sig过期时间的一办 预防前端拿到后不久就是失效的sig
        if (cache) {
          CacheFactory.set(sigKey, newUserSig, parseInt(expireAfter / 2, 10));
        }
        return newUserSig;
      });
  }
  /**
   * 删除缓存中的sig
   * @param name
   * @returns {Promise}
   */
  static deleteCacheSig(name) {
    return CacheFactory.del(`im:sig:${name}`);
  }
  /**
   * 生成 userSig
   * @param {String} userId 用户id
   * @return {String} 生成的失败时为false
   */
  static genSig(userId) {
    const content = {
      'TLS.appid_at_3rd': appIdAt3rd,
      'TLS.account_type': accountType,
      'TLS.identifier': userId,
      'TLS.sdk_appid': sdkAppId,
      'TLS.time': (Math.floor(Date.now() / 1000)).toString(),
      'TLS.expire_after': expireAfter.toString(), // 单位秒
    };
    const signContent = genSignContent(content);
    content['TLS.sig'] = sign(signContent);

    const text = JSON.stringify(content);
    const compressed = zlib.deflateSync(new Buffer(text)).toString('base64');
    return Base64.escape(compressed);
  }

  /**
   * 验证userSig
   * @param {String} sig userSig
   * @param {String} checkIdentifier 需要验证用户名
   * @return {Boolean} false 失败，true 成功
   */
  static verifySig(sig, checkIdentifier) {
    try {
      const compressed = Base64.unescape(sig);
      const text = zlib.inflateSync(new Buffer(compressed, 'base64'));
      const json = JSON.parse(text);
      if (json['TLS.identifier'] !== checkIdentifier) {
        return false;
      }

      const content = genSignContent(json);
      return verify(content, json['TLS.sig']);
    } catch (e) {
      return false;
    }
  }
}

module.exports = { ImSig, sdkAppId, accountType, appIdAt3rd, identifier, expireAfter };
