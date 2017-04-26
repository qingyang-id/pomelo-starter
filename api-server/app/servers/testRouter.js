/**
 * @description
 * @author yq
 * @date 2017/4/24 上午9:19
 */
const express = require('express');

const router = express.Router();

/**
 * @apiDefine live 直播
 */

/**
 * @api {get} /live/tabs/:roomId 查询标签页详情
 * @apiVersion 1.0.0
 * @apiName getRoomTab
 * @apiGroup live
 * @apiPermission 分析师
 *
 * @apiParam {String} roomId 直播间ID
 *
 * @apiExample {bash} 请求样例：
 *    curl -d https://www.58caimi.com/v1/live/tabs/5825f1ff7f6267a11e77762f
 *
 * @apiSuccess {String} code 标签页编码
 * @apiSuccess {String} name 标签页名称
 * @apiSuccess {Number} sort 标签页排序值
 * @apiSuccess {Number=1,-1} status 标签页状态:1启用，-1禁用
 *
 *
 * @apiSuccessExample 正常响应：
 *    HTTP/1.1 200 OK
 *    [
 *     {
 *          "code": "chat",
 *          "name": "互动",
 *          "sort": 255,
 *          "status": -1
 *      },
 *      {
 *          "code": "introduction",
 *          "name": "直播室介绍",
 *          "sort": 255,
 *          "status": -1
 *      },
 *      {
 *          "code": "tip",
 *          "name": "打赏榜",
 *          "sort": 255,
 *          "status": -1
 *      },
 *      {
 *          "code": "review",
 *          "name": "往期",
 *          "sort": 255,
 *          "status": -1
 *      }
 *    ]
 *
 * @apiErrorExample 错误响应：
 *    HTTP/1.1 500
 *    {
 *      "errCode": "InvalidRoomId",
 *      "errDesc": "直播间id格式不正"
 *    }
 */
router.get('/test', (req, res) => {
    res.json({
      code: 0,
      msg: '测试路由'
    })
  });

module.exports = router;

