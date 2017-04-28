/**
 * @description 关联账户dao
 * @author yq
 * @date 2017/4/26 下午5:46
 */
const crypto = require('crypto');
const Promise = require('bluebird');
const CommonUtil = require('../utils/commonUtil');

/**
 * 生成一个加密盐
 *
 * @param {Number} size 生成盐的随机字节长度
 *
 * @returns {Promise}
 * @private
 */
function generateSalt(size = 24) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, (err, buf) => {
      if (err) {
        return reject(err);
      }
      return resolve(buf.toString('base64'));
    });
  });
}

/**
 * 加密
 *
 * @param {String} password 密码
 * @param {String} salt 盐
 *
 * @returns {Promise}
 * @private
 */
function encrypt(password, salt) {
  return new Promise((resolve, reject) => {
    const iterations = 1000;
    const keyLen = 48;
    const digest = 'sha512';
    crypto.pbkdf2(password, salt, iterations, keyLen, digest, (err, key) => {
      if (err) {
        return reject(err);
      }
      return resolve(key.toString('base64'));
    });
  });
}

class UserDao {

	constructor(app) {
		this.app = app;
	}
  /**
   * check password
   *
   * @param {Object} opts 参数
   * -- {String} salt 加密盐
   * -- {String} password 密码
   * -- {String} checkPassword 待检查密码
   */
  checkPassword(opts) {
    return encrypt(opts.checkPassword, opts.salt)
      .then(encryptedPassword => encryptedPassword === opts.password);
  }

  /**
   * Create Account
   *
   * @param {Object} opts 参数
   * -- {String} username 账号
   * -- {String} password 密码
   */
	create(opts) {
		const app = this.app;
		let salt;
		return generateSalt()
      // 生成密码
      .then((result) => {
		    salt = result;
        return encrypt(opts.password, result);
      })
      .then((password) => {
        // 添加用户
        const sql = 'INSERT INTO t_users SET ?';
        const args = {
          id: CommonUtil.getObjectIdStr(),
          username: opts.username,
          password,
          salt,
          update_time: new Date(),
          create_time: new Date(),
        };
        return app.get('dbClient').queryAsync(sql, args);
      });
	}

  /**
   * 根据用户名查询用户
   *
   * @param {String} username 账号
   */
  getByUsername(username) {
    const app = this.app;
    return app.get('dbClient').queryAsync('SELECT id, username, password, salt FROM t_users WHERE username=?', username)
      .then(result => (result[0]));
  }
}

module.exports = UserDao;
