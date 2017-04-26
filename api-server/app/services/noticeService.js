var async = require('async');
var config = require('../../config/app.json');


var NoticeService = function(app) {
	this.app = app;
}

NoticeService.prototype.notice = function (roomID, url, role, name) {
	var channelId = this.app.get('channelService');
	var channel = this.app.get('channelService').getChannel(roomID);
	channel.pushMessage('room.resource_push', {
		data: {
			url: [url],
			desc : role,
			role : role,
			name : name
		}
	});
}

NoticeService.prototype.getRoomUserInfo = function (roomID, cb) {
	var channel = this.app.get('channelService').getChannel(roomID);
	if (channel) {
		cb(null, channel.__channelService__.channels[roomID].records);
	} else {
		cb(null, {});
	}
	
}

module.exports = NoticeService;
