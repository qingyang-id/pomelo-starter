var _ = require('lodash');
var dispatcher = require('../../../utils/dispatcher');

module.exports = function(app, http){
	this.app = app;
	var self = this;
	var getNowTime = function () {
		var time = new Date();
		return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '.' + time.getMilliseconds()
	}

	//TODO 内部接口，内网可以调用（将配置文件中的client地址改成内网地址即可）
	http.post('/api/course/open', function (req, res, next) {

		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		var courseId = req.body.courseId;

		var connectors = self.app.getServersByType('connector');

		var connector = dispatcher.dispatch(courseId, connectors);

		var course = self.app.get('courseService').load(courseId, connector);

		if (!_.isEmpty(course)) {
			res.send({
				code: 200, 
				data: {
					course: course
				}
			});
		} else {
			var newCourse = self.app.get('courseService').open(courseId, connector);
			if (newCourse) {
				res.send({
					code: 200,
					course : newCourse
				});
			} else {
				res.send({
					code: 500
				});
			}
		}

		if (self.app.get('courseService').open(courseId, connector)) {
			res.send({code: 200});
		} else {
			res.send({code: 500});
		}
	})

	//TODO 内部接口，内网调用
	http.post('/api/course/close', function (req, res, next) {

		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

		var courseId = req.body.courseId;

		var connectors = self.app.getServersByType('connector');
		var connector = dispatcher.dispatch(courseId, connectors);

		if (self.app.get('courseService').close(courseId, connector)) {
			res.send({code: 200});
		} else {
			res.send({code: 500});
		}
	})

	//TODO 内部接口，内网调用
	http.post('/api/course/load', function (req, res, next) {

		console.log('=====0', getNowTime())
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		var courseId = req.body.courseId;
		console.log('=====1', getNowTime())
		var connectors = self.app.getServersByType('connector');
		console.log('=====2', getNowTime())
		var connector = dispatcher.dispatch(courseId, connectors);
		console.log('=====3', getNowTime())
		var course = self.app.get('courseService').load(courseId, connector);
		console.log('=====4', getNowTime())
		if (!_.isEmpty(course)) {
			console.log('=====5', getNowTime())
			res.send({
				code: 200, 
				data: {
					course: course
				}
			});
		} else {
			console.log('=====6', getNowTime())
			res.send({code: 500});
		}
	})

	//TODO 内部接口，内网调用
	//FIXME 获取所有connectors
	http.post('/api/course/list', function (req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		var connectors = self.app.getServersByType('connector');

		var courses = self.app.get('courseService').list();
		res.send({
			code: 200,
			data: {
				courses: courses
			}
		});
	})
}