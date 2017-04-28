const express = require('express');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const assert = require('assert');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');
const log4js = require('log4js');
const errorHandler = require('../../middleware/errorHandler');
const noCache = require('../../middleware/noCache');
const FileUtil = require('../../../utils/fileUtil');
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 8087;

const defaultLogger = () => {
  return {
    debug: console.log,
    info: console.log,
    warn: console.warn,
    error: console.error,
  }
};

class Http {
  constructor(app, opts) {
    opts = opts || {};
    this.app = app;
    this.http = express();
    // self.logger.info('Http opts:', opts);
    this.host = opts.host || DEFAULT_HOST;
    this.port = opts.port || DEFAULT_PORT;


    // 通过nginx获取真实ip
    this.http.enable('trust proxy');

    if (process.env.NODE_ENV !== 'production') {
      this.http.use(logger('dev'));
    }

    if (!!opts.isCluster) {
      const serverId = app.getServerId();
      const params = serverId.split('-');
      const idx = parseInt(params[params.length - 1], 10);
      if (/\d+\+\+/.test(this.port)) {

        this.port = parseInt(this.port.substr(0, this.port.length - 2), 10);
      } else {
        assert.ok(false, 'http cluster expect http port format like "3000++"');
      }

      this.port = this.port + idx;
    }

    this.useSSL = !!opts.useSSL;
    this.sslOpts = {};
    if (this.useSSL) {
      this.sslOpts.key = fs.readFileSync(path.join(app.getBase(), opts.keyFile));
      this.sslOpts.cert = fs.readFileSync(path.join(app.getBase(), opts.certFile));
    }

    this.logger = opts.logger || defaultLogger();

    this.http.set('port', this.port);
    this.http.set('host', this.host);

    // body数据解析
    this.http.use(bodyParser.urlencoded({ extended: true }));
    this.http.use(bodyParser.json());
    this.http.use(bodyParser.text({ type: 'text/xml' }));

    // http方法扩展
    this.http.use(methodOverride());

    // 压缩
    this.http.use(compression());

    // 部分IE会对ajax请求缓存，设置禁止缓存的header
    this.http.use(noCache);

    const self = this;
    this.app.configure(() => {
      // 404
      // self.http.use((req, res) => {
      //   res.status(404).send({
      //     code: 404,
      //     msg: 'Not Found'
      //   });
      // });
      console.error('error',111);
      self.http.use(errorHandler);
    });
    console.error('error',111);
    self.http.use(errorHandler);

    this.beforeFilters = require('../index').beforeFilters;
    this.afterFilters = require('../index').afterFilters;
    this.server = null;
  }


  loadRoutes() {
    this.http.get('/', (req, res) => {
      res.send('http server ok!');
    });

    const self = this;
    const routesPath = path.join(this.app.getBase(), 'app/servers', this.app.getServerType(), 'routers');
    assert.ok(fs.existsSync(routesPath), 'Cannot find route path: ' + routesPath);
    const filePaths = [];
    FileUtil.getAllFilePathSync(routesPath, filePaths);
    filePaths.forEach((filePath) => {
      if (/.js$/.test(filePath)) {
        self.logger.info('加载路由路径---------', filePath);
        require(filePath)(self.app, self.http, self);
      }
    });
  }

  start(cb) {
    const self = this;

    this.beforeFilters.forEach((elem) => {
      self.http.use(elem);
    });

    this.loadRoutes();

    this.afterFilters.forEach((elem) => {
      self.http.use(elem);
    });

    if (this.useSSL) {
      this.server = https.createServer(this.sslOpts, this.http).listen(this.port, this.host, () => {
        self.logger.info('Http start', self.app.getServerId(), 'url: https://' + self.host + ':' + self.port);
        self.logger.info('Http start success');
        // 单进程下不阻塞进程，继续处理新的请求
        process.nextTick(cb);
      });
    } else {
      this.server = http.createServer(this.http).listen(this.port, this.host, () => {
        self.logger.info('Http start', self.app.getServerId(), 'url: http://' + self.host + ':' + self.port);
        self.logger.info('Http start success');
        // 单进程下不阻塞进程，继续处理新的请求
        process.nextTick(cb);
      });
    }
  }

  afterStart(cb) {
    this.logger.info('Http afterStart');
    // 单进程下不阻塞进程，继续处理新的请求
    process.nextTick(cb);
  }

  stop(force, cb) {
    const self = this;
    this.server.close(() => {
      self.logger.info('Http stop', force);
      cb();
    });
  };
}

module.exports = (app, opts) => {
  return new Http(app, opts);
};
