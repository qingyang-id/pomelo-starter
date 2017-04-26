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

		//the target is all users
		if(msg.target == '*') {
			channel.pushMessage(param);
		}
		//the target is specific user
		else {
			const tuid = msg.target + '*' + rid;
			const tsid = channel.getMember(tuid)['sid'];
			channelService.pushMessageByUids(param, [{
				uid: tuid,
				sid: tsid
			}]);
		}
		next(null, {
			route: msg.route
		});
	};
}

module.exports = (app) => {
	return new ChatHandler(app);
};
