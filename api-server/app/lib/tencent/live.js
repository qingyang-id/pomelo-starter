/**
 * @description 腾讯直播工具类
 * @author yq
 * @date 2017/3/11 下午3:11
 */
const crypto = require('crypto');
const config = require('../../../config/global');

const { bizId, pushKey } = config.live;

/**
 * md5加密
 *
 * @param {String} content 加密内容
 *
 * @return {String} 返回签名 失败时返回false
 */
function sign(content) {
  return crypto.createHash('md5')
    .update(content, 'utf8')
    .digest('hex');
}

/**
 * 生成推流签名
 *
 * @param {String} streamId 推流唯一id,直播间id
 * @param {Number} txTime Unix时间戳的16进制数值
 *
 * @return {String} 返回签名 失败时返回false
 */
function getPushSign({ streamId, txTime }) {
  const text = `${pushKey}${bizId}_${streamId}${txTime}`;
  return sign(text);
}

module.exports = {

  /**
   * 生成腾讯视频推流及播放地址
   *
   * @param {String} streamId 推流唯一id,直播间id
   * @param {Number} expireTime 过期时间，13位时间戳，默认24小时
   *
   * @return {String} 返回签名 失败时返回false
   */
  createLiveUrl({ streamId, expireTime = (Date.now() + (24 * 60 * 60 * 1000)) }) {
    const txTime = Math.round(expireTime / 1000).toString(16).toUpperCase();
    const txSecret = getPushSign({ streamId, txTime });
    const playUrl = `${bizId}.liveplay.myqcloud.com/live/${bizId}_${streamId}`;
    let pushUrl = `rtmp://${bizId}.livepush.myqcloud.com/live/${bizId}_${streamId}`;
    pushUrl = `${pushUrl}?bizid=${bizId}&txSecret=${txSecret}&txTime=${txTime}`;
    return {
      pushUrl,
      playUrl,
    };
  },

};
