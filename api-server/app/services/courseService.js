var _ = require('lodash');
var crypto = require('crypto');

var CourseService = function(app){
	this.app = app;
	this.courses = {};
	//FIXME
	this.courses['test'] = { roomId: 'test' };
}

CourseService.prototype.open = function(courseId, connector){
	var self = this;
	if (_.isEmpty(self.courses[courseId])) {
		var roomId = generateRoomId();
		self.courses[courseId] = {
			roomId: roomId,
			connector: connector
		};

		app.rpcInvoke(connector.id, {
			namespace: 'user',
			service: 'roomRemote',
			method: 'createRoom',
			args: [roomId]
		}, function (err) {
			if(!!err)
				console.log('createRoom error: ', err);
		});

		return self.courses[courseId];
	} else {
		return null;
	}
}

CourseService.prototype.close = function(courseId, connector){
	var self = this;

	if (!_.isEmpty(self.courses[courseId])) {
		app.rpcInvoke(connector.id, {
			namespace: 'user',
			service: 'roomRemote',
			method: 'removeRoom',
			args: [self.courses[courseId].roomId]
		}, function (err) {
			if(!!err)
				console.log('createRoom error: ', err);		
		});

		// connector.roomRemote.removeRoom(null, self.courses[courseId].roomId, function (err) {
		// 	if (!!err)
		// 		console.log('removeRoom error: ', err);
		// });		
		delete self.courses[courseId];
		return true;
	} else {
		return false;
	}
}

CourseService.prototype.load = function(courseId){
	return this.courses[courseId];
}

CourseService.prototype.list = function(){
	return this.courses;
}

var generateRoomId = function(){
	try{
		var buf = crypto.createHash('md5').update(new Date().getTime().toString()).digest('hex').substr(0, 16).toUpperCase();
		return buf;
	} catch(e) {
		return null;
	}
}

module.exports = CourseService;