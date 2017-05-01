class ChatRemote {
  constructor(app) {
    this.app = app;
    this.channelService = app.get('channelService');
  }

  /**
   * Add user into chat channel.
   *
   * @param {String} uid unique id for user
   * @param {String} sid server id
   * @param {String} name channel name
   * @param {boolean} flag channel parameter
   *
   */
  add(uid, sid, name, flag, cb) {
    const channel = this.channelService.getChannel(name, flag);
    const username = uid.split('*')[0];
    const param = {
      route: 'onAdd',
      user: username
    };
    channel.pushMessage(param);

    if (channel) {
      channel.add(uid, sid);
    }

    cb(this.get(name, flag));
  }

  /**
   * Get user from chat channel.
   *
   * @param {Object} opts parameters for request
   * @param {String} name channel name
   * @param {boolean} flag channel parameter
   * @return {Array} users uids in channel
   *
   */
  get(name, flag) {
    let users = [];
    const channel = this.channelService.getChannel(name, flag);
    if (channel) {
      users = channel.getMembers();
    }
    for (let i = 0; i < users.length; i += 1) {
      users[i] = users[i].split('*')[0];
    }
    return users;
  }

  /**
   * Kick user out chat channel.
   *
   * @param {String} uid unique id for user
   * @param {String} sid server id
   * @param {String} name channel name
   *
   */
  kick(uid, sid, name, cb) {
    const channel = this.channelService.getChannel(name, false);
    // leave channel
    if (channel) {
      channel.leave(uid, sid);
    }
    const username = uid.split('*')[0];
    const param = {
      route: 'onLeave',
      user: username
    };
    channel.pushMessage(param);
    cb();
  }
}
module.exports = function (app) {
  const B = function () {};
  B.prototype = ChatRemote.prototype;

  const chatRemote = new B(app);
  // Object.defineProperties(chatRemote, {
  //   add: {
  //     enumerable: true
  //   },
  //   get: {
  //     enumerable: true
  //   },
  //   kick: {
  //     enumerable: true
  //   }
  // });
  // Object.defineProperties(chatRemote, 'get', {
  //   enumerable: true
  // });
  // Object.defineProperties(chatRemote, 'kick', {
  //   enumerable: true
  // });
  return chatRemote;
};
