/**
 * @description 腾讯im签名相关路由
 * @author yq
 * @date 2017/4/30 下午5:11
 */
/**
 * @description im签名相关路由
 * @author yq
 * @date 2016/12/23 上午10:42.
 */
const ImController = require('../../../../../controllers/imController');
const requireToken = require('../../../../../lib/middleware/requireToken');

module.exports = (app, express) => {
  const router = express.Router();

  const imCtrl = new ImController(app);
  // 获取im登录token
  router.get('/', requireToken, imCtrl.getSig.bind(imCtrl));

  return router;
};
