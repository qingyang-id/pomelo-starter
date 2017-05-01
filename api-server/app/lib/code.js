/**
 * @description 错误码
 * @author yq
 * @date 2017/4/28 上午10:26
 */
module.exports = {
  SUCCESS: 0, // 成功
  FAIL: 1, // 失败
  ERR_SERVER: 500, // 系统错误
  TOKEN_INVALID: 1001, // token不正确
  TOKEN_EXPIRE: 401, // token过期
  ERR_PHONE: 1003, // 手机号码不正确
  ERR_CREATE_TOKEN: 1004, // 创建token失败
  TOKEN_REQUIRE: 1005, // token缺失

  USER: {
    USER_NOT_EXIST: 1100, // 用户不存在
    USERNAME_EXIST: 1101, // 用户名已存在
    ERR_PASSWORD: 1102, // 用户名或密码不正确
    ERR_REPEAT_LOGIN: 1103, // 重复登录
    ERR_REPEAT_LOGOUT: 1104, // 重复退出
    ERR_CREATE_IM_SIG: 1105, // 生成腾讯im令牌失败
  },

  ROOM: {
    ERR_LIVE_NO_AV_ROOM_ID: 1200, // 用户没有av房间ID
    ERR_USER_NO_LIVE: 1201 // 用户没有在直播
  },

  ENTRY: {
    FA_TOKEN_INVALID: 1001,
    FA_TOKEN_EXPIRE: 1002,
    FA_USER_NOT_EXIST: 1003
  },

  GATE: {
    FA_NO_SERVER_AVAILABLE: 2001
  },

  CHAT: {
    FA_CHANNEL_CREATE: 3001,
    FA_CHANNEL_NOT_EXIST: 3002,
    FA_UNKNOWN_CONNECTOR: 3003,
    FA_USER_NOT_ONLINE: 3004
  }
};
