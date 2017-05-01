const BaseResult = require('../baseResult');
const log = require('pomelo-logger').getLogger('middleware.errorHandler');

const { NODE_ENV } = process.env;

module.exports = (err, req, res, next) => {
  // rpc 序列化反序列化后的结果已经不是BaseResult的实例
  if (err instanceof BaseResult || {}.hasOwnProperty.call(err, 'code')) {
    log.debug(req.originalUrl, err);
    res.send(err);
    return next();
  }
  log.error(err);
  const msg = (NODE_ENV !== 'production' && err.message) ? err.message : '系统错误，若多次出现请联系客服';
  res.send(BaseResult.create(BaseResult.CODE.ERR_SERVER, msg));
  return next();
};
