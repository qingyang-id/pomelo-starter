/**
 * @description 缓存工厂 本项目redis只能用于缓存数据，禁止持久化操作
 * @author yq
 * @date 2017/4/30 下午3:58
 */
const RedisClient = require('./redisClient');

class CacheFactory {
  constructor(app, redis = 'redis') {
    this.client = RedisClient.create(app.get('globalConfig')[redis]);
  }

  /**
   * 获取缓存客户端
   *
   * @returns {*}
   */
  getClient() {
    return this.client;
  }

  /**
   * 获取缓存
   *
   * @param key 键值
   *
   * @returns {*}
   */
  get(key) {
    return this.client.get(key);
  }

  /**
   * 删除缓存
   *
   * @param key 键值
   *
   * @returns {*}
   */
  del(key) {
    return this.client.del(key);
  }

  /**
   * 存 只有在 key 不存在时设置 key 的值并返回1,反之返回0
   * @param key 键值
   * @param value 存入的值
   * @param expire 失效时间，单位秒
   * @returns {Promise}
   */
  setNx(key, value, expire) {
    return this.client.set(key, value, 'EX', expire, 'NX');
  }

  /**
   * 普通存 key 不存在时新增 key 存在时替换
   * @param key 键值
   * @param value 存入的值
   * @param expire 失效时间，单位秒
   * @returns {Promise}
   */
  set(key, value, expire) {
    return this.client.set(key, value, 'EX', expire);
  }
}

module.exports = CacheFactory;
