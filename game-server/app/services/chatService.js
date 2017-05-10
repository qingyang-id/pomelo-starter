const Code = require('../lib/code');
const utils = require('../utils/utils');
const dispatcher = require('../utils/dispatcher');
const Event = require('../consts/consts').Event;

const ChatService = function (app) {
  this.app = app;
  this.uidMap = {};
  this.nameMap = {};
  this.channelMap = {};
};

module.exports = ChatService;

/**
 * Clear all records of the user
 */
const clearRecords = function (service, uid) {
  delete service.channelMap[uid];

  const record = service.uidMap[uid];
  if (!record) {
    return;
  }

  delete service.uidMap[uid];
  delete service.nameMap[record.name];
};

/**
 * Remove records for the specified user and channel pair
 */
const removeRecord = function (service, uid, channelName) {
  delete service.channelMap[uid][channelName];
  if (utils.size(service.channelMap[uid])) {
    return;
  }

  // if user not in any channel then clear his records
  clearRecords(service, uid);
};

/**
 * Get the connector server id assosiated with the uid
 */
const getSidByUid = function (uid, app) {
  const connector = dispatcher.dispatch(uid, app.getServersByType('connector'));
  if (connector) {
    return connector.id;
  }
  return null;
};

/**
 * Cehck whether the user has already in the channel
 */
const checkDuplicate = function (service, uid, channelName) {
  return !!service.channelMap[uid] && !!service.channelMap[uid][channelName];
};

/**
 * Add records for the specified user
 */
const addRecord = function (service, uid, name, sid, channelName) {
  const record = { uid, name, sid };
  service.uidMap[uid] = record;
  service.nameMap[name] = record;
  let item = service.channelMap[uid];
  if (!item) {
    item = {};
    service.channelMap[uid] = {};
  }
  item[channelName] = 1;
};

/**
 * Add player into the channel
 *
 * @param {String} uid         user id
 * @param {String} playerName  player's role name
 * @param {String} channelName channel name
 * @return {Number} see code.js
 */
ChatService.prototype.add = function (uid, playerName, channelName) {
  const sid = getSidByUid(uid, this.app);
  if (!sid) {
    return Code.CHAT.FA_UNKNOWN_CONNECTOR;
  }

  if (checkDuplicate(this, uid, channelName)) {
    return Code.SUCCESS;
  }

  const channel = this.app.get('channelService').getChannel(channelName, true);
  if (!channel) {
    return Code.CHAT.FA_CHANNEL_CREATE;
  }

  channel.add(uid, sid);
  addRecord(this, uid, playerName, sid, channelName);

  return Code.SUCCESS;
};

/**
 * User leaves the channel
 *
 * @param  {String} uid         user id
 * @param  {String} channelName channel name
 */
ChatService.prototype.leave = function (uid, channelName) {
  const record = this.uidMap[uid];
  const channel = this.app.get('channelService').getChannel(channelName, true);

  if (channel && record) {
    channel.leave(uid, record.sid);
  }

  removeRecord(this, uid, channelName);
};

/**
 * Kick user from chat service.
 * This operation would remove the user from all channels and
 * clear all the records of the user.
 *
 * @param  {String} uid user id
 */
ChatService.prototype.kick = function (uid) {
  const channelNames = this.channelMap[uid];
  const record = this.uidMap[uid];

  if (channelNames && record) {
    // remove user from channels
    const that = this;
    Object.keys(channelNames).forEach((name) => {
      const channel = that.app.get('channelService').getChannel(name);
      if (channel) {
        channel.leave(uid, record.sid);
      }
    });
  }

  clearRecords(this, uid);
};

/**
 * Push message by the specified channel
 *
 * @param  {String}   channelName channel name
 * @param  {Object}   msg         message json object
 * @param  {Function} cb          callback function
 */
ChatService.prototype.pushByChannel = function (channelName, msg, cb) {
  const channel = this.app.get('channelService').getChannel(channelName);
  if (!channel) {
    cb(new Error(`channel ${channelName} dose not exist`));
    return;
  }

  channel.pushMessage(Event.chat, msg, cb);
};

/**
 * Push message to the specified player
 *
 * @param  {String}   playerName player's role name
 * @param  {Object}   msg        message json object
 * @param  {Function} cb         callback
 */
ChatService.prototype.pushByPlayerName = function (playerName, msg, cb) {
  const record = this.nameMap[playerName];
  if (!record) {
    cb(null, Code.CHAT.FA_USER_NOT_ONLINE);
    return;
  }

  this.app.get('channelService').pushMessageByUids(Event.chat, msg, [{
    uid: record.uid,
    sid: record.sid
  }], cb);
};

