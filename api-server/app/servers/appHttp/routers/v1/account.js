/**
 * @description 集成账户相关路由
 * @author yq
 * @date 2017/4/27 下午3:02
 */
const dispatcher = require('../../../../utils/dispatcher');
const BaseResult = require('../../../../lib/baseResult');

module.exports = function(app, http) {
  /**
   * @apiDefine account 集成账户
   */

  /**
   * @api {post} /v1/accounts 注册
   * @apiVersion 1.0.0
   * @apiName createAccount
   * @apiGroup account
   *
   * @apiParam {String} username 账号
   * @apiParam {String} password 密码的md5密文
   *
   * @apiExample {bash} 请求样例：
   *    curl -d 'username=test&password=e10adc3949ba59abbe56e057f20f883e' https://www.dlkj.com/v1/test
   *
   * @apiSuccess {Number} code 代码
   * @apiSuccess {String} msg 提示内容
   *
   *
   * @apiSuccessExample 正常响应：
   *    HTTP/1.1 200 OK
   *    {
   *       "code": 0,
   *       "msg": "http 测试接口",
   *       "data": {
   *         "id": "e10adc3949ba59abbe56e057",
   *         "username": "test",
   *       }
   *    }
   *
   * @apiErrorExample 错误响应：
   *    HTTP/1.1 500
   *    {
   *       "code": 500,
   *       "msg": "系统错误",
   *    }
   */
  http.post('/v1/accounts', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const connectors = app.getServersByType('connector');
    const connector = dispatcher.dispatch(username, connectors);
    app.rpcInvoke(connector.id, {
      namespace : 'user',
      service : 'accountRemote',
      method : 'register',
      args : [
        username,
        password
      ]
    }, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(BaseResult.SUCCESS);
    });
  });
};