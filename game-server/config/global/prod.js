module.exports = {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '123456',
    db: 0
  },
  mysql: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'game_db',
    dateStrings: true,
    connectionLimit: 100
  },
  mongodb: 'mongodb://admin:123456@127.0.0.1:3717/game_db',
  token: {
    secret: 'dl2017',
    expireAfter: 24 * 60 * 60
  }
};
