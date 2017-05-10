/**
 * @description token 工具类
 * @author yq
 * @date 2017/5/1 下午12:37
 */
const Jwt = require('jsonwebtoken');
const BaseResult = require('../lib/baseResult');
const { secret, expireAfter } = require('../../config/global').token;

class TokenUtil {
  /**
   * 生成token
   *
   * @param data
   *
   * @returns {Promise}
   */
  static createToken(data) {
    return new Promise((resolve, reject) => {
      Jwt.sign({ data }, secret, { expiresIn: expireAfter }, (err, token) => {
        if (err) {
          reject(BaseResult.ERR_CREATE_TOKEN);
        }
        return resolve(token);
      });
    });
  }
}

module.exports = TokenUtil;
