/**
 * @description 用户控制层
 * @author yq
 * @date 2017/4/28 下午1:58
 */
const dispatcher = require('../utils/dispatcher');
const BaseResult = require('../lib/baseResult');
const Code = require('../lib/code');

class UserController {
  constructor(app) {
    this.app = app;
  }

  /**
   * 注册
   * @param req
   * @param res
   * @param next
   */
  register(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const connectors = this.app.getServersByType('connector');
    const connector = dispatcher.dispatch(username, connectors);
    this.app.rpcInvoke(connector.id, {
      namespace: 'user',
      service: 'userRemote',
      method: 'register',
      args: [
        username,
        password
      ]
    }, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(BaseResult.SUCCESS);
    });
  }

  /**
   * 登录
   * @param req
   * @param res
   * @param next
   */
  login(req, res, next) {
    console.log('\n\n\n~~~~~~~~', this, '~~~~~~~\n\n\n')
    const username = req.body.username;
    const password = req.body.password;
    const connectors = this.app.getServersByType('connector');
    const connector = dispatcher.dispatch(username, connectors);
    this.app.rpcInvoke(connector.id, {
      namespace: 'user',
      service: 'userRemote',
      method: 'login',
      args: [
        username,
        password
      ]
    }, (err, resp) => {
      if (err) {
        return next(err);
      }
      return res.json(BaseResult.create(Code.SUCCESS, '成功', resp));
    });
  }
}

module.exports = UserController;
