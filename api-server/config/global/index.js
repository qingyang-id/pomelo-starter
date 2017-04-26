const prod = require('./prod');
const test = require('./test');
const dev = require('./dev');
const local = require('./local');

let config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = prod;
    break;
  case 'test':
    config = test;
    break;
  case 'development':
    config = dev;
    break;
  default:
    config = local;
}

module.exports = config;
