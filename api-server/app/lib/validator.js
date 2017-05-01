const moment = require('moment');
const { ObjectId } = require('mongoose').Types;
const BaseResult = require('./baseResult');

// 小数正则
const positiveFloatPattern = /^([1-9]\d{0,10}|0)(.\d{1,2})?$/;
// 日期字符串正则 2017-05-01 08:00:00.000
const dateFormatFullPattern = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?(.\d{3})?$/;

class Validator {

  /**
   * 检验浮点数
   *
   * @param {String|Number} value 待检验的值
   * @param {Object} opts 校验选项
   *  - {Number} min 最小值
   *  - {Number} max 最大值
   * @param {BaseResult} error 错误
   *
   * @returns {Object} this
   */
  checkFloat(value, {
    min = 0,
    max = 999999999,
  }, error) {
    if (!positiveFloatPattern.test(value)) {
      throw error;
    }
    const n = Number(value);
    if (n < min || n > max) {
      throw error;
    }
    return this;
  }

  /**
   * 校验整数
   *
   * @param {String|Number} value 待校验的值
   * @param {Object} opts 校验选项
   *  - {Number} min 最小值
   *  - {Number} max 最大值
   * @param {BaseResult} error 错误
   *
   * @returns {Object} this
   * @public
   */
  checkInt(value, {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
  }, error) {
    const n = Number(value);
    if (!Number.isInteger(n) || n < min || n > max) {
      throw error;
    }

    return this;
  }

  /**
   * 检验ObjectId
   *
   * @param {String} id 待检查的id
   * @param {BaseResult} error 错误
   *
   * @returns {Object} this
   * @public
   */
  checkObjectId(id, error) {
    if (ObjectId.isValid(id)) {
      return this;
    }

    throw error;
  }

  /**
   * 校验字符串类型的字段是否合法
   *
   * @param {String} value 待校验的值
   * @param {Object} opts 校验选项
   *  - {Number} len 固定长度
   *  - {Number} maxLen 最大长度
   *  - {Number} minLen 最小长度
   *  - {RegExp} regex 需满足的正则表达式
   * @param {BaseResult} error 错误
   *
   * @returns {Object} this
   * @public
   */
  checkString(value, { len, maxLen, minLen, regex } = {}, error) {
    if (typeof value !== 'string'
      || (len && value.length !== len)
      || (maxLen && value.length > maxLen)
      || (minLen && value.length < minLen)
      || (regex && !regex.test(value))
    ) {
      throw error;
    }

    return this;
  }

  /**
   * 校验手大陆11位手机号码
   *
   * @param {String} phone 待校验的号码
   * @param {BaseResult} [error] 错误
   *
   * @returns
   * @public
   */
  checkPhone(phone, error) {
    const err = error || BaseResult.ERR_PHPNE;
    return this.checkString(phone, { regex: /^1[3578]\d{9}$/ }, err);
  }

  /**
   * 校验短信验证码
   *
   * @param {String} value 待校验的验证码
   * @param {BaseResult} [error] 错误
   *
   * @returns {Object} this
   * @public
   */
  checkByRegex(value, regex, error) {
    if (!regex.test(value)) {
      throw error;
    }

    return this;
  }

  /**
   * 校验url
   *
   * @param {String} url 网址
   * @param {BaseResult} error 错误
   *
   * @returns
   * @public
   */
  checkUrl(url, error) {
    return this.checkString(url, {
      maxLen: 256,
      regex: /^https?:\/\/([\w-]+\.)+[\w-]+.*$/,
    }, error);
  }

  /**
   * 校验枚举值
   *
   * @param {*} value 待校验的值
   * @param {Array} enums 枚举值
   * @param {BaseResult} error 错误
   *
   * @returns {Object} this
   * @public
   */
  checkEnum(value, enums, error) {
    if (enums.includes(value)) {
      return this;
    }

    throw error;
  }

  /**
   * 校验日期时间 此方法校验部分类型会抛出异常，例如校验checkDatetime('aaa')
   *
   * @param {String} value 待校验的值
   * @param {BaseResult} error 错误
   *
   * @returns {Object} this
   * @public
   */
  checkDatetime(value, error) {
    if (moment(value).isValid()) {
      return this;
    }

    throw error;
  }

  /**
   * 校验是否是日期字符串
   *
   * @param {String} value 待校验的值 例：2016-01-01 (00:00:00)
   * @param {BaseResult} error 错误
   *
   * @returns {Object} this
   * @public
   */
  checkDate(value, error) {
    if (dateFormatFullPattern.test(value) && !isNaN(Date.parse(value))) {
      return this;
    }

    throw error;
  }
}

module.exports = Validator;
