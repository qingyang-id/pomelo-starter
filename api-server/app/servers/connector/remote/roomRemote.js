module.exports = function(app){
	return new RoomRemote(app);
}

var RoomRemote = function(app){
	this.app = app;
	this.channelService = app.get('channelService');
	//FIXME
	this.channelService.createChannel('123');
}

RoomRemote.prototype.createRoom = function(roomId, cb){
	//console.log(this.app.settings.serverId);
	this.channelService.createChannel(roomId);
	cb();
}

RoomRemote.prototype.removeRoom = function(roomId, cb){
	this.channelService.destroyChannel(roomId);
	cb();
}

RoomRemote.prototype.noticepic = function(roomID, url, role, name, cb){
	var channel = this.channelService;
	this.app.get('noticeService').notice(roomID, url, role, name);
	cb();
}

RoomRemote.prototype.getUserRoomInfo = function(roomID, cb){
	var channel = this.channelService;
	this.app.get('noticeService').getRoomUserInfo(roomID, cb);
}
