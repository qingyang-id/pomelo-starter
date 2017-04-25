const pomelo = require('pomelo');
const routeUtil = require('./app/utils/routeUtil');
const httpPlugin = require('./app/lib/http');
const path = require('path');
const CourseService = require('./app/services/courseService');
const NoticeService = require('./app/services/noticeService');
/**
 * Init app for client.
 */
const app = pomelo.createApp();
app.set('name', 'api-pomelo');

app.configure('production|development', 'appHttp', function(){
  app.loadConfig('httpConfig', path.join(app.getBase(), 'config/http.json'));
  console.log('ceshi--------', {
    http: app.get('httpConfig')['appHttp']
  });
  app.use(httpPlugin, {
    http: app.get('httpConfig')['appHttp']
  });
});

app.configure('production|development', function() {
	// route configures
	app.route('chat', routeUtil.chat);
	app.set('connectorConfig', {
		connector: pomelo.connectors.sioconnector,
		// 'websocket', 'polling-xhr', 'polling-jsonp', 'polling'
		transports: ['websocket', 'polling'],
		heartbeats: true,
		closeTimeout: 60 * 1000,
		heartbeatTimeout: 60 * 1000,
		heartbeatInterval: 25 * 1000
	});
	// filter configures
	app.filter(pomelo.timeout());
});

app.set('courseService', new CourseService(app));
app.set('noticeService', new NoticeService(app));

// start app
app.start();

process.on('uncaughtException', (err) => {
	console.error(' Caught exception: ' + err.stack);
});