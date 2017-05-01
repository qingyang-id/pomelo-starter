/**
 * @description im相关服务类
 * @author yq
 * @date 2017/4/30 下午5:39
 */
const BaseResult = require('../lib/baseResult');
const { ImSig, sdkAppId, accountType, appIdAt3rd } = require('../lib/tencent/imSig');

class ImService {
  constructor(app) {
    this.app = app;
    this.imSig = ImSig;
  }

  /**
   * 获取im登录签名
   *
   * @param {String} identifier
   * @param {String} identifierNick
   * @param {Boolean} cache 是否缓存
   *
   * @returns {Promise}
   */
  getImSig({ identifier, identifierNick, cache }) {
    // 查重
    return this.imSig.getCacheSig(identifier, cache)
      .then((userSig) => {
        if (!userSig) {
          throw BaseResult.ERR_CREATE_IM_SIG;
        }
        return {
          sdkAppId,
          appIdAt3rd,
          accountType,
          userSig,
          identifier,
          identifierNick,
        };
      });
  }

}

module.exports = ImService;
