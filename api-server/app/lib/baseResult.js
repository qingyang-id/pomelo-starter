/**
 * @description 请求返回工厂类
 * @author yq
 * @date 2017/4/25 下午3:07
 */
const Code = require('./code');

class BaseResult {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  /**
   * 创建返回信息
   *
   * @param {Number} code 状态码
   * @param {String} msg 描述
   * @param {Object} [data] 返回数据信息
   *
   * @returns {BaseResult}
   * @public
   */
  static create(code, msg, data) {
    return new BaseResult(code, msg, data);
  }
  setCode(code) {
    this.code = code;
  }
  getCode() {
    return this.code;
  }
  setMsg(msg) {
    this.msg = msg;
  }
  getMsg() {
    return this.msg;
  }
  setData(data) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
}

module.exports = BaseResult;

// 通用错误信息
BaseResult.SUCCESS =  BaseResult.create(Code.SUCCESS,'成功');
BaseResult.FAILED = BaseResult.create(Code.FAIL,'失败');
BaseResult.ERR_SERVER = BaseResult.create(Code.ERR_SERVER,'系统错误，请刷新重试，若多次出现请联系客服');
BaseResult.ERR_TOKEN_EXPIRE = BaseResult.create(Code.TOKEN_EXPIRE,'token过期');

// 账号相关
BaseResult.USER_NOT_EXIST = BaseResult.create(Code.USER.USER_NOT_EXIST,'用户不存在');
BaseResult.USERNAME_EXIST = BaseResult.create(Code.USER.USERNAME_EXIST,'用户名已存在');
BaseResult.ERR_PASSWORD = BaseResult.create(Code.USER.ERR_PASSWORD,'用户名或密码不正确');
BaseResult.ERR_REPEAT_LOGIN = BaseResult.create(Code.USER.ERR_REPEAT_LOGIN,'重复登录');
BaseResult.ERR_REPEAT_LOGOUT = BaseResult.create(Code.USER.ERR_REPEAT_LOGOUT,'重复退出');

// 直播相关
BaseResult.ERR_LIVE_NO_AV_ROOM_ID = BaseResult.create(Code.ROOM.ERR_LIVE_NO_AV_ROOM_ID,'用户没有av房间ID');
BaseResult.ERR_USER_NO_LIVE = BaseResult.create(Code.ROOM.ERR_USER_NO_LIVE,'用户没有在直播');
