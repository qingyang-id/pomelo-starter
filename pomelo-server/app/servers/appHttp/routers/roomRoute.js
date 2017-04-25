/**
 * 房间内js
 */
var dispatcher = require('../../../utils/dispatcher');
var _ = require('lodash');
var request = require('request');
var async = require('async');
var static = require('../../../../config/static.json')

module.exports = function (app, http) {
	var self = this;
	self.app = app;
	var getNowTime = function () {
		var time = new Date();
		return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '.' + time.getMilliseconds()
	}
	http.get('/api/room/info', function (req, res) {
		res.send({'msg':'232232'})
	})

	http.post('/api/room/getUsersInfo', function (req, res) {

		console.log('=====10', getNowTime())
		var courseId = req.body.courseId;
		var connectors = app.getServersByType('connector');
		var connector = dispatcher.dispatch(courseId, connectors);
		console.log('=====11', getNowTime())
		if (!courseId) {
			res.send({
				code : 500,
				desc : '课堂号不存在'
			})
		}

		async.waterfall([

			//请求本地课程 拿到真正房间号
			function (next) {
				console.log('=====12', getNowTime())
				request.post({
					url : static.requestURL + '/api/course/load',
					form : {
						courseId : courseId
					}
				}, function (err, response) {
					console.log('=====13', getNowTime())
					if (err) {
						next(err)
					} else {

						if (typeof response == 'string') {
							try {
								response = JSON.parse(response);
							} catch (e) {
								next('本地课堂请求数据有误')
							}
						}
						if (!response.body) {
							next('课堂不存在');
						} else {
							next(null, response.body)
						}
						
					}

				})
			},

			//去拿对应的房间信息
			function (_data, next) {
				console.log('=====14', getNowTime())
				if (typeof _data == 'string') {
					var _data = JSON.parse(_data);
				}
				if (_data.code != 200) {
					next('课堂不存在')
				} else {
					console.log('=====15', getNowTime())
					app.rpcInvoke(connector.id, {
						namespace : 'user',
						service : 'roomRemote',
						method : 'getUserRoomInfo',
						args : [_data.data.course.roomId]
					}, function (err, resp) {
						console.log('=====16', getNowTime())
						if (err) {
							next(err);
						} else {
							next(null, {
								users : resp
							})
						}

					})

				}
			}
		//做流程中的最后的返回值
		], function (err, response) {
			console.log('=====17', getNowTime())
			if (err) {
				res.send({
					code : 500,
					desc : err
				})
			} else {
				res.send({
					code : 200,
					data : response
				})
			}
			
		})

	})

	http.post('/api/room/notifyUrl', function (req, res) {

		var roomId = req.body.courseId,
			roomAutoId = req.body.roomId,
			role = req.body.role,
			name = req.body.name,
			url = req.body.url;

		var connectors = app.getServersByType('connector');
		var connector = dispatcher.dispatch(roomId, connectors);

		app.rpcInvoke(connector.id, {
			namespace : 'user',
			service : 'roomRemote',
			method : 'noticepic',
			args : [roomAutoId, url, role, name]
		}, function (err) {

			if (err) {
				res.send({
					code : 500,
					desc : err
				})
			} else {
				res.send({
					code : 200
				})
			}

		})

	})

}

