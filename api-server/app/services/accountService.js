/**
 * @description 用户服务类
 * @author yq
 * @date 2017/4/27 上午10:34
 */
const BaseResult = require('../lib/baseResult');
const AccountDao = require('../dao/accountDao');

class AccountService {
  constructor(app) {
    this.app = app;
    this.accountDao = new AccountDao(app);
  }

  /**
   * Register Account
   *
   * @param {Object} opts 参数
   * -- {String} username 账号
   * -- {String} password 密码
   */
  register(opts) {
    const that = this;
    // 查重
    return that.accountDao.getByUsername(opts.username)
      .then((account) => {
        if (account[0]) {
          throw BaseResult.USER_EXIST;
        }
        // 新增用户
        return that.accountDao.create({
          username: opts.username,
          password: opts.password
        });
      });
  }

  /**
   * Login Account
   *
   * @param {Object} opts 参数
   * -- {String} username 账号
   * -- {String} password 密码
   */
  login(opts) {
    const that = this;
    // 查询用户是否存在
    return that.accountDao.getByUsername(opts.username)
      .then((account) => {
        if (!account) {
          throw BaseResult.USER_NOT_EXIST;
        }
        // 校验密码
        return that.accountDao.checkPassword({
          salt: account.salt,
          password: account.password,
          checkPassword: opts.password
        })
          .then((isSame) => {
            if (!isSame) {
              throw BaseResult.ERR_PASSWORD;
            }
            return account;
          });
      });
  }
}

module.exports = AccountService;
