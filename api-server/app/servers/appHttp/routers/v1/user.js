/**
 * @description 集成账户相关路由
 * @author yq
 * @date 2017/4/27 下午3:02
 */
const UserController = require('../../../../controllers/userController');

module.exports = (app, express) => {
  const router = express.Router();
  const userCtrl = new UserController(app);

  // 注册
  router.post('/register', userCtrl.register.bind(userCtrl));
  // 登录
  router.post('/login', userCtrl.login.bind(userCtrl));

  return router;
};
