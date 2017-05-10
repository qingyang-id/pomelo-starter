class ChatHandler {
  constructor(app) {
    this.app = app;
    this.chatService = app.get('chatService');
  }

  /**
   * Send messages to users
   *
   * @param {Object} msg message from client
   * @param {Object} session
   * @param  {Function} next next stemp callback
   *
   */
  send(msg, session, next) {
    const rid = session.get('rid');
    const username = session.uid.split('*')[0];
    const channelService = this.app.get('channelService');
    const param = {
      route: 'onChat',
      msg: msg.content,
      from: username,
      target: msg.target
    };
    const channel = channelService.getChannel(rid, false);

    if (msg.target === '*') {
      // the target is all users
      channel.pushMessage(param);
    } else {
      // the target is specific user
      const tUid = `${msg.target}*${rid}`;
      const tSid = channel.getMember(tUid).sid;
      channelService.pushMessageByUids(param, [{
        uid: tUid,
        sid: tSid
      }]);
    }
    next(null, {
      route: msg.route
    });
  }
}

module.exports = app => new ChatHandler(app);
