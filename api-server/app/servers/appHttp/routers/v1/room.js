/**
 * @description 直播间相关路由
 * @author yq
 * @date 2017/4/27 上午10:17
 */
const express = require('express');
const UserController = require('../../controllers/userController');

const router = express.Router();

function init(userController) {
  console.log(userController.app);
  router.get('/rooms/token', (req, res) => {
    console.log(app, http);
    res.send({
      code: 0,
      msg: '测试接口'
    })
  });
  router.post('/rooms/token', userController.login);
  return router;
}

module.exports = (app, http) => {
  /**
   * @apiDefine v1Test http服务
   */

  /**
   * @api {get} /v1/rooms/token 获取直播间token
   * @apiVersion 1.0.0
   * @apiName getTest
   * @apiGroup v1Test
   *
   * @apiParam {String} id 测试编号
   *
   * @apiExample {bash} 请求样例：
   *    curl -i https://www.dlkj.com/v1/test
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
 *    }
   *
   * @apiErrorExample 错误响应：
   *    HTTP/1.1 500
   *    {
 *       "code": 500,
 *       "msg": "系统错误",
 *    }
   */
  // router.get('/rooms/token', (req, res) => {
  //   console.log(app, http);
  //   res.send({
  //     code: 0,
  //     msg: '测试接口'
  //   })
  // });
  // router.post('/rooms/token', userController.login);
  // return router;
  return init(new UserController(app));
};