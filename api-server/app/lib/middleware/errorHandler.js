const BaseResult = require('../baseResult');
const Code = require('../code');
const log = require('log4js').getLogger('middleware.errorHandler');

const { NODE_ENV } = process.env;

module.exports = (err, req, res, next) => {
  // rpc 序列化反序列化后的结果已经不是BaseResult的实例
  if (err.hasOwnProperty('code')) {
    log.debug(req.originalUrl, err);
    return res.send(err);
  }
  log.error(err);
  const msg = (NODE_ENV !== 'production' && err.message) ? err.message : '系统错误，若多次出现请联系客服';
  res.send(BaseResult.create(Code.ERR_SERVER, msg));
};
