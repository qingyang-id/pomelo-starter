/**
 * @description 用户服务类
 * @author yq
 * @date 2017/4/27 上午10:34
 */
const BaseResult = require('../lib/baseResult');
const UserDao = require('../dao/userDao');

class UserService {
  constructor(app) {
    this.app = app;
    this.userDao = new UserDao(app);
  }

  /**
   * Register User
   *
   * @param {Object} opts 参数
   * -- {String} username 账号
   * -- {String} password 密码
   */
  register(opts) {
    const that = this;
    // 查重
    return that.userDao.getByUsername(opts.username)
      .then((user) => {
        if (user) {
          throw BaseResult.USERNAME_EXIST;
        }
        // 新增用户
        return that.userDao.create({
          username: opts.username,
          password: opts.password
        });
      });
  }

  /**
   * Login User
   *
   * @param {Object} opts 参数
   * -- {String} username 账号
   * -- {String} password 密码
   */
  login(opts) {
    const that = this;
    // 查询用户是否存在
    return that.userDao.getByUsername(opts.username)
      .then((user) => {
        if (!user) {
          throw BaseResult.USER_NOT_EXIST;
        }
        // 校验密码
        return that.userDao.checkPassword({
          salt: user.salt,
          password: user.password,
          checkPassword: opts.password
        })
          .then((isSame) => {
            if (!isSame) {
              throw BaseResult.ERR_PASSWORD;
            }
            return user;
          });
      });
  }
}

module.exports = UserService;
