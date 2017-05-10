const dispatcher = require('../../../utils/dispatcher');

class Handler {
  constructor(app) {
    this.app = app;
  }

  /**
   * Gate handler that dispatch user to connectors.
   *
   * @param {Object} msg message from client
   * @param {Object} session
   * @param {Function} next next stemp callback
   *
   */
  queryEntry(msg, session, next) {
    const uid = msg.uid;
    if (!uid) {
      next(null, {
        code: 500
      });
      return;
    }
    // get all connectors
    const connectors = this.app.getServersByType('connector');
    if (!connectors || connectors.length === 0) {
      next(null, {
        code: 500
      });
      return;
    }
    // select connector
    const res = dispatcher.dispatch(uid, connectors);
    next(null, {
      code: 200,
      host: res.host,
      port: res.clientPort
    });
  }
}

module.exports = app => new Handler(app);
