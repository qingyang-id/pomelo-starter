/**
 * @description 全局配置
 * @author yq
 * @date 2017/4/27 上午8:59
 */

let config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./dev');
    break;
  case 'test':
    config = require('./test');
    break;
  case 'development':
    config = require('./prod');
    break;
  default:
    config = require('./dev');
}

module.exports = config;
