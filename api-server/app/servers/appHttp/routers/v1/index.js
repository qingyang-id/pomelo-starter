/**
 * @description v1版本相关接口
 * @author yq
 * @date 2017/4/28 下午2:19
 */
const UserRouter = require('./user');
const ImRouter = require('./im');

module.exports = (app, express) => {
  const router = express.Router();

  // 用户相关路由
  router.use('/users', UserRouter(app, express));
  // im相关接口
  router.use('/im', ImRouter(app, express));

  return router;
};
