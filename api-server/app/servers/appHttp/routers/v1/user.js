/**
 * @description 集成账户相关路由
 * @author yq
 * @date 2017/4/27 下午3:02
 */
const UserController = require('../../../../controllers/userController');
const express = require('express');

class UserRouter {
  constructor(app) {
    console.log(app);
    this.router = express.Router();
    this.userController = new UserController(app);
  }
  init() {
    /**
     * @apiDefine user 账户
     */

    /**
     * @api {post} /v1/users/register 注册
     * @apiVersion 1.0.0
     * @apiName register
     * @apiGroup user
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
     *       "msg": "成功"
     *    }
     *
     * @apiErrorExample 错误响应：
     *    HTTP/1.1 500
     *    {
     *       "code": 500,
     *       "msg": "系统错误",
     *    }
     */
    this.router.post('/register', this.userController.register);
    /**
     * @api {post} /v1/users/login 登录
     * @apiVersion 1.0.0
     * @apiName login
     * @apiGroup user
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
    this.router.post('/login', this.userController.login);
    return this.router;
  }
}
module.exports = UserRouter;