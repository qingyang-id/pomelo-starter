const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * 聊天记录表
 */
const chatRecordSchema = new Schema({
  /**
   * 直播间id
   * @type {ObjectId}
   */
  roomId: {
    type: String,
    index: true,
  },
  /**
   * 用户id/发送人id
   * @type {ObjectId}
   */
  sendId: {
    type: String,
    index: true,
  },
  /**
   * 消息分类
   * @type {String}
   */
  catalog: {
    type: String,
    enum: ['chat', 'text', 'strategy'],
    default: 'chat',
    required: true,
    index: true,
  },
  /**
   * 消息体 JSON
   * @type {String}
   */
  message: {
    type: Object,
    required: true,
  },
  /**
   * 消息发送时间
   * @type {Number}
   */
  sendTime: {
    type: Number,
    index: true,
    default: Date.now,
  },
  /**
   * 消息唯一 编号
   * @type {Number}
   */
  msgSeq: {
    type: Number,
    index: true,
    required: true,
    default: 0,
  },
  /**
   * 状态 1正常，-1发送失败， -10已删除
   * @type {Number}
   */
  status: {
    type: Number,
    enum: [1, -1, -10],
    default: 1,
    required: true,
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

const ChatRecord = mongoose.model('chat_record', chatRecordSchema);

module.exports = ChatRecord;
