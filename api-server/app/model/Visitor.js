const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * 游客表
 */
const visitorSchema = new Schema({
  /**
   * 用户Id 和im账号相同
   * @type {String}
   */
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  /**
   * 更新时间
   * @type {Number}
   */
  updateTime: {
    type: Number,
    default: Date.now,
  },
  /**
   * 创建时间
   * @type {Number}
   */
  createTime: {
    type: Number,
    default: Date.now,
  },
});

const Visitor = mongoose.model('visitor', visitorSchema);

module.exports = Visitor;
