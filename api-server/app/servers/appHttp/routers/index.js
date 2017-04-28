/**
 * @description 对外http服务路由
 * @author yq
 * @date 2017/4/23 下午6:01
 */
// const V1Router = require('./v1');
const roomRouter = require('./v1/room');

module.exports = (app, http) => {
  // v1版本路由
  http.use('/v1', roomRouter(app, http));
};
