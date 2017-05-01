/**
 * @description base64转换工具
 * @author yq
 * @date 2016/12/22 上午10:52.
 */
class Base64 {

  static unescape(str) {
    return (str + Array(5 - (str.length % 4)))
      .replace(/_/g, '=')
      .replace(/-/g, '/')
      .replace(/\*/g, '+');
  }

  static escape(str) {
    return str.replace(/\+/g, '*')
      .replace(/\//g, '-')
      .replace(/=/g, '_');
  }

  static encode(str) {
    return this.escape(new Buffer(str).toString('base64'));
  }

  static decode(str) {
    return new Buffer(this.unescape(str), 'base64').toString();
  }
}

module.exports = Base64;
