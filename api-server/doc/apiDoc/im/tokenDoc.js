/**
 * @apiDefine imToken 腾讯im签名相关接口
 */

/**
 * @api {get} /v1/im/tokens 获取签名信息
 * @apiDescription 签名使用过程中不排除失效的可能性，前端最好做一下失效处理，失效时，从接口重新拿取新的签名信息
 * @apiVersion 1.0.0
 * @apiName getSig
 * @apiGroup imToken
 * @apiPermission 登录用户
 *
 * @apiExample {bash} 请求样例：
 *    curl -i https://www.dlkj.com/v1/im/token
 *
 * @apiSuccess {Number} code 代码
 * @apiSuccess {String} msg 提示内容
 * @apiSuccess {Object} data 返回信息
 * @apiSuccess {String} data.sdkAppId 用户标识接入SDK的应用ID
 * @apiSuccess {String} data.appIDAt3rd App用户使用OAuth授权体系分配的AppId，和sdkAppID一样
 * @apiSuccess {String} data.accountType 账号类型
 * @apiSuccess {String} data.identifier 用户账号，登录用户为用户的userId,游客为随机分配的26位字符串（V-开头）
 * @apiSuccess {String} data.identifierNick 用户昵称
 * @apiSuccess {String} data.userSig imSdk鉴权Token
 *
 * @apiSuccessExample 正常响应：
 *    HTTP/1.1 200 Success
 *    {
 *      "sdkAppID": "1400022000",
 *      "appIDAt3rd": "1400022000",
 *      "accountType": "9000",
 *      "identifier": "58256153622c083e8c1537ea",
 *      "identifierNick": "张老师",
 *      "userSig": "eJxtzE1rgzAcgPHvkuvGyNKkaGGnOIp0ljrj3i4hNWn3R6MhZr
 *        S27LtPbLfTrs8PnjMST8Wdcg60VEHOvEYLdE8xxoTgmKHbi1dV99UGGQZnRo-Z
 *        HF8FtGkD7MD4sVcKLFyh17Wctv-9Algz9YiMFOHfmzk68EaqXZh*0Zz*UQ-7sWSPJU-zJ
 *        EtvdFwMtsbcPrf4bb09hU2zPa42VAu-aijYmSDDxzLP072hy1cWDiJZl8Fj5TrGP991kiV
 *        VWXD3InhNDqwTWdz0D*j7B-RpU_o_"
 *    }
 *
 * @apiErrorExample 错误响应：
 *    HTTP/1.1 400
 *    {
 *       "code": 500,
 *       "msg": "系统错误"
 *    }
 */
