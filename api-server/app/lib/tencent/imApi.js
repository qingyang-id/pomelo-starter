/**
 * @description 请求通用方法
 * @author yq
 * @date 2016/12/23 上午9:56.
 */
const request = require('superagent');
const Promise = require('bluebird');
const log = require('pomelo-logger').getLogger('lib.tencent.imApi');

const { ImSig, identifier, sdkAppId } = require('./imSig');

/**
 * 组装url
 * @param path
 * @returns {Promise}
 */
function parseUrl(path) {
  return ImSig.getCacheSig(identifier)
    .then(userSig => `https://console.tim.qq.com${path}?usersig=${userSig}`
      + `&identifier=${identifier}&sdkappid=${sdkAppId}&random=${Date.now()}&contenttype=json`
    );
}

class ImApi {

  /**
   * 请求im通用方法 签名失败时有重试机制，最大重试3次
   * @param {String} path
   * @param {Object} data
   * @param {Object} extra 扩展参数
   * @returns {Promise}
   */
  static sendRequest(path, data, extra = { sendCount: 1 }) {
    return parseUrl(path)
      .then(url => request.post(url)
         .type('application/json')
         .send(data || {})
         .then(({ text }) => JSON.parse(text))
         .then((result) => {
           if (result.ActionStatus === 'FAIL') {
             if (result.ErrorCode === 70004 || extra.sendCount > 0) {
               // 签名失效/或需要失败重试
               extra.sendCount = typeof extra.sendCount === 'number' ? extra.sendCount -= 1 : 3;
               if (extra.sendCount <= 0) {
                 log.error(`请求腾讯失败，且超过最大重试次数：${result.ErrorCode}-错误原因：${result.ErrorInfo}`);
                 return Promise.reject(result);
               }
               return ImSig.deleteCacheSig(identifier)
                 .then(() => ImApi.sendRequest(path, data, extra));
             }
             log.error(`'请求腾讯im接口失败-错误代码：${result.ErrorCode}-错误原因：${result.ErrorInfo}`);
             return Promise.reject(result);
           }
           return result;
         })
      );
  }
}

module.exports = ImApi;
