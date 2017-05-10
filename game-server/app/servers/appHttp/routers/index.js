/**
 * @description 对外http服务路由
 * @author yq
 * @date 2017/4/23 下午6:01
 */
const V1Router = require('./v1');

module.exports = (app, express) => {
  const router = express.Router();

  // v1版本路由
  router.use('/v1', V1Router(app, express));

  return router;
};
