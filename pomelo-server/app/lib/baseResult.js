/**
 * @description 请求返回工厂类
 * @author yq
 * @date 2017/4/25 下午3:07
 */
class BaseResult {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  /**
   * 创建返回信息
   *
   * @param {Number} code 状态码
   * @param {String} msg 描述
   * @param {Object} [data] 返回数据信息
   *
   * @returns {BaseResult}
   * @public
   */
  static create(code, msg, data) {
    return new BaseResult(code, msg, data);
  }
  setCode(code) {
    this.code = code;
  }
  getCode() {
    return this.code;
  }
  setMsg(msg) {
    this.msg = msg;
  }
  getMsg() {
    return this.msg;
  }
  setData(data) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
}

module.exports = BaseResult;

// 通用错误信息
BaseResult.SUCCESS =  BaseResult.create(0,'成功');
BaseResult.FAILED = BaseResult.create(1,'失败');
