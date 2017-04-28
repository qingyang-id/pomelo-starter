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
  TOKEN_EXPIRE: 1002, // token过期

  USER: {
    USER_NOT_EXIST: 1100, // 用户不存在
    USERNAME_EXIST: 1101, // 用户名已存在
    ERR_PASSWORD: 1101, // 用户名或密码不正确
    ERR_REPEAT_LOGIN: 1101, // 重复登录
    ERR_REPEAT_LOGOUT: 1101, // 重复退出
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
