/**
 * @description 聊天session管理
 * @author yq
 * @date 2017/4/28 下午2:19
 */

/**
 * User log out handler
 *
 * @param {Object} app current application
 * @param {Object} session current session object
 *
 */
function onUserLeave(app, session) {
  if (!session || !session.uid) {
    return;
  }
  app.rpc.chat.chatRemote.kick(session, session.uid, app.get('serverId'), session.get('rid'), null);
}

class EntryHandler {
  constructor(app) {
    this.app = app;
  }

  /**
   * New client entry chat server.
   *
   * @param  {Object}   msg     request message
   * @param  {Object}   session current session object
   * @param  {Function} next    next stemp callback
   * @return {Void}
   */
  enter(msg, session, next) {
    const self = this;
    const rid = msg.rid;
    const uid = `${msg.username}*${rid}`;
    const sessionService = self.app.get('sessionService');

    // duplicate log in
    if (sessionService.getByUid(uid)) {
      return next(null, {
        code: 500,
        error: true
      });
    }

    session.bind(uid);
    session.set('rid', rid);
    session.push('rid', (err) => {
      if (err) {
        console.error('set rid for session service failed! error is : %j', err.stack);
      }
    });
    session.on('closed', onUserLeave.bind(null, self.app));

    // put user into channel
    return self.app.rpc.chat.chatRemote.add(session, uid, self.app.get('serverId'), rid, true, users => next(null, {
      users
    }));
  }
}

Object.defineProperties(EntryHandler.prototype, {
  enter: {
    enumerable: true
  }
});

module.exports = function (app) {
  return new EntryHandler(app);
};
