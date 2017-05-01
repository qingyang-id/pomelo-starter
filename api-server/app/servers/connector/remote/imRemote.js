/**
 * @description im connector
 * @author yq
 * @date 2017/4/27 下午2:57
 */
const ImService = require('../../../services/imService');

class ImRemote {
  constructor(app) {
    this.app = app;
    this.imService = new ImService(app);
  }
  /**
   * getImSig
   *
   * @param {String} identifier
   * @param {String} identifierNick
   * @param {Boolean} cache 是否缓存
   *
   * @param {function} cb callback
   *
   */
  getImSig({ identifier, identifierNick, cache }, cb) {
    this.imService.getImSig({ identifier, identifierNick, cache })
      .then(result => cb(null, result))
      .catch(cb);
  }

}

module.exports = app => new ImRemote(app);
