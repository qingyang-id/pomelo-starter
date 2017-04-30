/**
 * @description 对外http服务路由
 * @author yq
 * @date 2017/4/23 下午6:01
 */
const UserController = require('../../../controllers/userController');

module.exports = (app, http) => {
  const userCtrl = new UserController(app);
  // v1版本路由
  http.post('/v1/token', userCtrl.login.bind(userCtrl));
};
