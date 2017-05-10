const pomelo = require('pomelo');
const routeUtil = require('./app/utils/routeUtil');
const httpPlugin = require('pomelo-http');
const path = require('path');
const MysqlPool = require('./app/lib/mysqlPool');
// const CacheFactory = require('./app/lib/cacheFactory');
const errorHandler = require('./app/lib/middleware/errorHandler');
const log = require('pomelo-logger').getLogger('app');
/**
 * Init app for client.
 */
const app = pomelo.createApp();
app.set('name', 'api-pomelo');

app.configure('production|development', 'appHttp', () => {
  app.loadConfig('httpConfig', path.join(app.getBase(), 'config/http.json'));
  app.get('httpConfig').appHttp.forEach(httpComponent => app.use(httpPlugin, {
    httpComponent
  }));
  // app.use(httpPlugin, {
  //   httpComponent: app.get('httpConfig').appHttp
  // });
  httpPlugin.afterFilter((req, res) => {
    res.status(404).send({
      code: 404,
      msg: 'Not Found'
    });
  });
  httpPlugin.afterFilter(errorHandler);
});

app.configure('production|development', () => {
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
  // 加载配置信息
  app.loadConfig('globalConfig', `${app.getBase()}/config/global`);
  // filter configures
  app.filter(pomelo.timeout());
});

// Configure database
app.configure('production|development', 'user|chat|connector|master', () => {
  const mysqlClient = new MysqlPool(app).createMysqlPool('mysql');
  // const redisClient = new CacheFactory(app);
  app.set('dbClient', mysqlClient);
  // app.set('redisClient', redisClient);
});

// app.set('errorHandler', errorHandler);

// start app
app.start();

process.on('uncaughtException', (err) => {
  log.error(` Caught exception: ${err.stack}`);
});
