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
    database: 'sxb_db',
    dateStrings: true,
    connectionLimit: 100
  },
  mongodb: 'mongodb://admin:123456@127.0.0.1:3717/live_db',
  token: {
    secret: 'dl2017',
    expireAfter: 24 * 60 * 60
  },
  im: {
    url: 'https://console.tim.qq.com',
    sdkAppId: '14000271291',
    appIdAt3rd: '14000271292',
    identifier: 'admin12',
    accountType: '114333',
    expireAfter: 30 * 24 * 60 * 60,
    privateKeyFile: 'config/tencent/im_private_key_test.pem',
    publicKeyFile: 'config/tencent/im_public_key_test.pem'
  },
  live: {
    appId: '12534567222',
    bizId: 85072,
    pushKey: '1eec2db75f280c29442c47d18ea8c31d',
    apiKey: '5ece1a1342b5b4c18b57c48fb9823893'
  }
};
