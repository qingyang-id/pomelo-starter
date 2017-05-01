/**
 * @description 身份验证
 * @author yq
 * @date 2017/5/1 上午11:48
 */
const Jwt = require('jsonwebtoken');
const BaseResult = require('../baseResult');
const { secret } = require('../../../config/global').token;

/**
 * 校验token是否正确
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    throw BaseResult.TOKEN_REQUIRE;
  }
  // 确认token
  Jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json(BaseResult.TOKEN_EXPIRE);
    }
    // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
    req.user = decoded;
    return next();
  });
};
