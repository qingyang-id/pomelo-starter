const BaseResult = require('../baseResult');
const log = require('log4js').getLogger('middleware.httpErrorHandler');

const { NODE_ENV } = process.env;

/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
module.exports = (err, req, res, next) => {
  if (err instanceof BaseResult) {
    log.debug(req.originalUrl, err);
    res.send(err);
  } else {
    log.error(err);
    res.send(BaseResult.create(500, NODE_ENV === 'production' ? '服务异常' : err.msg));
  }
};
