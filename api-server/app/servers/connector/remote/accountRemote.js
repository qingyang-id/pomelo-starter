/**
 * @description 账号相关逻辑
 * @author yq
 * @date 2017/4/27 下午2:57
 */
const AccountService = require('../../../services/accountService');

class AccountRemote {
  constructor(app) {
    this.app = app;
    this.channelService = app.get('channelService');
    this.accountService = new AccountService(app);
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
    this.accountService.register({ username, password })
      .then(() => cb())
      .catch(cb);
  };
  /**
   * Login
   *
   * @param {String} username unique username for user
   * @param {String} password user password by md5
   * @param {function} cb callback
   *
   */
  login(username, password, cb) {
    this.accountService.login({ username, password })
      .then(() => cb())
      .catch(cb);
  };
}

module.exports = (app) => {
  return new AccountRemote(app);
};
