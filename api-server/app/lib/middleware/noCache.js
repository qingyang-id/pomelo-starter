/**
 * 缓存设置中间件
 */
module.exports = (req, res, next) => {
  res.set('Cache-Control', 'no-cache');
  next();
};
