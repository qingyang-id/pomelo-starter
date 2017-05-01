/**
 * @description 腾讯im相关接口
 * @author yq
 * @date 2017/4/30 下午5:11
 */
const TokenRouter = require('./token');

module.exports = (app, express) => {
  const router = express.Router();

  // im token 相关路由
  router.use('/tokens', TokenRouter(app, express));

  return router;
};
