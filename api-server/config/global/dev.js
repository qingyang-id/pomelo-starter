module.exports = {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    auth_pass: '123456'
  },
  mysql: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'sxb_db',
    dateStrings: true,
    connectionLimit: 100
  },
  mongodb: 'mongodb://admin:123456@127.0.0.1:3717/live_db',
};
