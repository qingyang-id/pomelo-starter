/**
 * @description 账号相关逻辑
 * @author yq
 * @date 2017/4/27 下午2:57
 */
const UserService = require('../../../services/userService');

class UserRemote {
  constructor(app) {
    this.app = app;
    this.channelService = app.get('channelService');
    this.userService = new UserService(app);
  }
  /**
   * Register
   *
   * @param {String} username unique username for user
   * @param {String} password user password by md5
   * @param {function} cb callback
   *
   */
  register(username, password, cb) {
    this.userService.register({ username, password })
      .then(() => cb())
      .catch(cb);
  }
  /**
   * Login
   *
   * @param {String} username unique username for user
   * @param {String} password user password by md5
   * @param {function} cb callback
   *
   */
  login(username, password, cb) {
    this.userService.login({ username, password })
      .then(result => cb(null, result))
      .catch(cb);
  }
}

module.exports = app => new UserRemote(app);
