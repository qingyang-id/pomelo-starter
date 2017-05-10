/**
 * @description redis 客户端
 * @author yq
 * @date 2017/5/1 上午9:43
 */
const Redis = require('ioredis');
const log = require('pomelo-logger').getLogger(__filename);

module.exports = {
  /**
   * 创建redis客户端
   *
   * @param {Object} options 参数选项
   *
   * @returns {Client}
   */
  create(options) {
    log.info('创建redis客户端......');
    const client = new Redis(options);

    // 错误处理
    client.on('error', (e) => {
      log.error(e);
    });

    // 断线重连处理
    client.on('reconnecting', (e) => {
      log.warn('Reconnecting:', e);
    });

    return client;
  }
};
