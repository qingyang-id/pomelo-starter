/**
 * @description 腾讯云控制层
 * @author yq
 * @date 2016/12/23 下午4:53.
 */
const dispatcher = require('../utils/dispatcher');
const BaseResult = require('../lib/baseResult');

class ImController {
  constructor(app) {
    this.app = app;
  }
  /**
   * 获取腾讯云token
   * @param {String} identifier
   * @param {String} identifierNick
   * @param {Boolean} cache 是否缓存
   * @returns {Promise}
   */
  getSig(req, res, next) {
    const connectors = this.app.getServersByType('connector');
    const connector = dispatcher.dispatch('123', connectors);
    this.app.rpcInvoke(connector.id, {
      namespace: 'user',
      service: 'imRemote',
      method: 'getImSig',
      args: [{
        identifier: req.user.id,
        identifierNick: req.user.nick
      }]
    }, (err, resp) => {
      if (err) {
        return next(err);
      }
      return res.json(BaseResult.create(BaseResult.CODE.SUCCESS, '成功', resp));
    });
  }

}

module.exports = ImController;
