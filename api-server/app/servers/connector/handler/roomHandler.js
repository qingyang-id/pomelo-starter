const _ = require('lodash');


/**
 * 退出房间呢
 */
const onUserInterrupt = (app, room, roomid, session) => {
  const channel = app.get('channelService').getChannel(session.get('roomId'));
  if (!!channel) {
    channel.leave(session.uid, app.getServerId());
    channel.pushMessage({
      route: 'room.close_push',
      data: {
        uid: session.uid,
        role : session.get('role'),
        name : session.get('name')
      }
    });
    for (let i = 0; i < room[roomid].length; i++) {
      if (room[roomid][i].uid == session.uid) {
        room[roomid].splice(i, 1)
      }
    }
  }
};


/**
 * 是否已经存在教师或者学生id
 */
const roleIsHas = (msg, rooms) => {
  if (rooms.length && rooms[0].role == 'teacher' && msg.role == 'teacher') {
    return 0;
  } else {

    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].uid == msg.uid) {
        return i;
      }
    }

  }
  return -1;

};


class RoomHandler {
	constructor(app) {
    this.app = app;
    this.channelService = app.get('channelService');
    this.ops = [];//暂时存储画笔记录
    this.roomStatus = {};//busy':正在使用中
    this.room = {}; //用来存房间信息
	}


  enter(msg, session, next){
    const self = this;
    const channel = self.channelService.getChannel(msg.roomId);
    if (!_.isEmpty(channel)) {
      self.room[msg.roomId] = self.room[msg.roomId] || [];
      const _rooms = self.room[msg.roomId],
        _index = roleIsHas(msg, _rooms);
      //是否老师已登录 或者 id已经重复
      if ( _index > -1) {
        self.app.get('sessionService').kick(_rooms[_index].uid, '您的帐户已在其他地方登录', function (data){
          joinRoom.call(self, msg, session, next);
        })
      } else {
        joinRoom.call(self, msg, session, next);
      }


    } else {
      next(null, {code: 500, desc: '房间不存在，或已关闭！'});
    }
  }

  leave(msg, session, next){
    const self = this;
    const channel = self.channelService.getChannel(session.get('roomId'));
    if (!!channel) {
      channel.pushMessage({
        route: 'room.leave_push',
        data: {
          uid: session.uid
        }
      })
      console.log('发送离开事件')
      channel.leave(uid, self.app.getServerId());
    }
    next(null, {code: 200});
  }

  draw(msg, session, next){
    const roomId = session.get("roomId");
    const channel = this.channelService.getChannel(roomId, false);

    if (!!channel) {
      const record = {
        data: {
          cid: msg.cid,
          op: msg.op,
          t: msg.t,
          role : msg.role
        }
      }


      channel.pushMessage('room.draw', record);
      //TODO
      if (!!this.roomStatus[roomId] && this.roomStatus[roomId] == 'busy')
        this.ops.push(record.data);
    }
  }

  chat(msg, session, next){
    const roomId = session.get('roomId');
    const channel = this.channelService.getChannel(roomId, false);

    if (!_.isEmpty(channel)) {
      channel.pushMessage('room.chat_push', {
        data: {
          msg: msg.msg,
          nickname: msg.nickname,
          avatar: msg.avatar,
          role: msg.role
        }
      });
    }
    next(null, {code: 200});
  }

  resource(msg, session, next){
    const roomId = session.get('roomId');
    const channel = this.channelService.getChannel(roomId, false);

    if (!_.isEmpty(channel)) {
      channel.pushMessage('room.resource_push', {
        data: {
          url: msg.url,
          desc: msg.desc
        }
      });
    }
    next(null, {code: 200});
  }
  /**
   * 切换服务器
   * @param  {[type]}   msg     [description]
   * @param  {[type]}   session [description]
   * @param  {Function} next    [description]
   * @return {[type]}           [description]
   */
  switch(msg, session, next){
    const roomId = session.get('roomId');
    const channel = this.channelService.getChannel(roomId, false);

    if (!_.isEmpty(channel)) {
      channel.pushMessage('room.switch_push', {
        data: {
          times: msg.times,
          type : msg.type
        }
      });
    }
    next(null, {code: 200});
  }


  /**
   * 传递音视频消息
   */
  videomsg(msg, session, next) {
    const roomId = session.get('roomId');
    const self = this;
    const channel = this.channelService.getChannel(roomId, false);
    if (!_.isEmpty(channel)) {
      const rooms = self.room[msg.data.roomId];
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].uid == msg.data.uid) {
          self.room[msg.data.roomId][i].videoStatus = true;
          break;
        }
      }
      channel.pushMessage('room.videomsg_push', {
        data: {
          role : msg.data.role,
          status: msg.data.status,
          users : JSON.stringify(self.room[msg.data.roomId])
        }
      });
    }
    next(null, {code: 200});
  }



  /**
   * 图片状态
   * @param  {[type]}   msg     [description]
   * @param  {[type]}   session [description]
   * @param  {Function} next    [description]
   * @return {[type]}           [description]
   */
  imgstatus(msg, session, next){
    const roomId = session.get('roomId');
    const channel = this.channelService.getChannel(roomId, false);
    if (!_.isEmpty(channel)) {
      channel.pushMessage('room.imgstatus_push', {
        data: {
          index: msg.index,
          status : msg.status,
          statusrole : msg.role
        }
      });
    }
    next(null, {code: 200});
  }

  /**
   * 状态初始化
   */
  init(msg, session, next){
    const roomId = session.get('roomId');
    const channel = this.channelService.getChannel(roomId, false);
    if (!_.isEmpty(channel)) {
      channel.pushMessage('room.init_push', {
        data: {
          width : msg.width,
          height : msg.height,
          role : msg.role
        }
      });
    }
    next(null, {code: 200});
  }

  /**
   * http
   */
  pic(roomId, next){

    const channel = this.channelService.getChannel(roomId, false);
    if (!_.isEmpty(channel)) {
      channel.pushMessage('room.pic_push', {
        data: {
          data : roomId
        }
      });
    }
    next(null, {code: 200});
  }


  start(msg, session, next){
    const roomId = session.get('roomId');

    if (!!roomId) {
      this.roomStatus[roomId] = 'busy';
      next(null, {code: 200});
    } else {
      next(null, {code: 500, desc: '房间不存在，或已关闭！'});
    }
  }

  stop(msg, session, next){
    const roomId = session.get('roomId');

    if (!!roomId) {
      delete this.roomStatus[roomId];
      next(null, {code: 200});
    } else {
      next(null, {code: 500, desc: '房间不存在，或已关闭！'});
    }

  }

  fabric(msg, session, next) {
    const roomId = session.get('roomId');
    const channel = this.channelService.getChannel(roomId, false);
    const self = this;
    if (!_.isEmpty(channel)) {

      channel.pushMessage('room.fabric_push', {
        data: {
          type : msg.type,
          data : msg.data,
          uid : msg.uid
        }
      });

      // if (msg.type == 'syncData') { //如果是同步
      // 	console.log('同步sync', msg.data.uid, self.app.get('serverId'))
      // 	self.app.get('channelService').pushMessageByUids('room.fabric_push', {
      // 		data: {
      // 			type : msg.type,
      // 			data : msg.data,
      // 			uid : msg.uid
      // 		}
      // 	}, [{
      // 		uid : msg.data.uid,
      // 		sid : self.app.get('serverId')
      // 	}])

      // } else {
      // 	console.log('=======')
      // 	channel.pushMessage('room.fabric_push', {
      // 		data: {
      // 			type : msg.type,
      // 			data : msg.data,
      // 			uid : msg.uid
      // 		}
      // 	});

      // }

    }
    next(null, {code: 200});
  }

  fabricUid(msg, session, next) {
    const roomId = session.get('roomId');
    const channel = this.channelService.getChannel(roomId, false);
    const self = this;
    if (!_.isEmpty(channel)) {

      console.log('同步sync', msg.aimUid, self.app.get('serverId'))
      self.app.get('channelService').pushMessageByUids('room.fabricUid_push', {
        data: {
          type : msg.type,
          data : msg.data,
          uid : msg.uid
        }
      }, [{
        uid : msg.aimUid,
        sid : self.app.get('serverId')
      }])

    }
    next(null, {code: 200});
  }

  /**
   * 加入房间的方法
   */
  joinRoom(msg, session, next) {

		const self = this;
		const channel = self.channelService.getChannel(msg.roomId);
		session.bind(msg.uid);
		session.set('roomId', msg.roomId);
		session.set('role', msg.role);
		session.set('name', msg.name);
		session.push('roomId');
		session.push('role');
		session.push('name');
		session.on('closed', onUserInterrupt.bind(null, self.app, self.room, msg.roomId));
		channel.add(msg.uid, self.app.getServerId());
		if (msg.role == 'teacher') { //必须保证老师第一吗，客服最后
		self.room[msg.roomId].unshift({
																		role : msg.role,
		uid : msg.uid,
		name : msg.name
	});
	} else if (msg.role == 'consultant') {
		self.room[msg.roomId].push({
			role : msg.role,
			uid : msg.uid,
			name : msg.name,
			server : msg.server
		});
	} else {
		const _rooms = self.room[msg.roomId];
		let	_index = _rooms.length;
		for (let i = 0 ; i < _rooms.length; i++) {
			if (_rooms[i].role == 'consultant') {
				_index = i;
				break;
			}
		}

		self.room[msg.roomId].splice(_index, 0, {
			role : msg.role,
			uid : msg.uid,
			name : msg.name,
			server : msg.server

		})

	}

	channel.pushMessage({
		route: 'room.enter_push',
		data: {
			uid: msg.uid,
			role: msg.role,
			name : msg.name,
			server : msg.server,
			users : JSON.stringify(self.room[msg.roomId])
		}
	})
	next(null, {code: 200, data:{}});

	}
}

module.exports = (app) => {
	return new RoomHandler(app);
};
