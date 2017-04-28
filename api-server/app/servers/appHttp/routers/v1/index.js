/**
 * @description v1版本相关接口
 * @author yq
 * @date 2017/4/28 下午2:19
 */
const express = require('express');
const UserRouter = require('./user');

class IndexRouter {
  constructor(app, http) {
    this.router = express.Router();
    this.app = app;
    this.http = http;
  }
  init() {
    const app = this.app;
    this.router.use('/users', new UserRouter(app).init());
    return this.router;
  }
}
module.exports = IndexRouter;
