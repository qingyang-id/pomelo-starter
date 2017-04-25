/**
 * @description 对外http服务
 * @author yq
 * @date 2017/4/23 下午6:01
 */

/**
 * @apiDefine test http服务
 */

/**
 * @api {get} /test 测试接口
 * @apiVersion 1.0.0
 * @apiName getTest
 * @apiGroup test
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
 *       "name": "互动",
 *          "sort": 255,
 *          "status": -1
 *    }
 *
 * @apiErrorExample 错误响应：
 *    HTTP/1.1 500
 *    {
 *      "errCode": "InvalidRoomId",
 *      "errDesc": "直播间id格式不正"
 *    }
 */
module.exports = (app, http) => {
  http.get('/test', (req, res) => {
    res.send({
      code: 0,
      msg: '测试接口'
    })
  });
};

