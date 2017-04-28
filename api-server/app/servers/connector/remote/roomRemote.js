/**
 * @description 原房间逻辑
 * @author yq
 * @date 2017/4/27 下午2:57
 */

class RoomRemote {
	constructor(app) {
    this.app = app;
    this.channelService = app.get('channelService');
    //FIXME
    this.channelService.createChannel('123');
	}
  createRoom(roomId, cb){
		this.channelService.createChannel(roomId);
		cb();
	}

  removeRoom(roomId, cb){
		this.channelService.destroyChannel(roomId);
		cb();
	}

  noticepic(roomID, url, role, name, cb){
		this.app.get('noticeService').notice(roomID, url, role, name);
		cb();
	}

  getUserRoomInfo(roomID, cb){
		this.app.get('noticeService').getRoomUserInfo(roomID, cb);
	}
}

module.exports = (app) => {
	return new RoomRemote(app);
};
