/**
 * @description 通用工具类
 * @author yq
 * @date 2016/12/15 下午5:42.
 */
const { ObjectId } = require('mongoose').Types;

class CommonUtil {
  /**
   * IP信息格式化
   * @param ip
   * @returns {string}
   */
  static formatIP(ip) {
    const reg = '((?:(?:25[0-5]|2[0-4]\\d' +
      '|((1\\d{2})|([1-9]?\\d)))\\.){3}(?:25[0-5]' +
      '|2[0-4]\\d|((1\\d{2})|([1-9]?\\d))))';
    const ips = new RegExp(reg).exec(ip);
    return ips && ips[0] ? ips[0] : '';
  }

  /**
   * 字符串转化为ObjectId
   * @param str
   * @returns {*}
   */
  static strToObjectId(str) {
    return str ? ObjectId(str) : '';
  }

  /**
   * 判断字符串是否是ObjectId
   * @param id
   * @returns {*}
   */
  static isObjectId(id) {
    return ObjectId.isValid(id);
  }

  /**
   * 生成ObjectId
   * @returns {Object}
   */
  static getObjectId() {
    return ObjectId();
  }

  /**
   * 生成ObjectId字符串
   * @returns {Object}
   */
  static getObjectIdStr() {
    return ObjectId().toString();
  }
}

module.exports = CommonUtil;
