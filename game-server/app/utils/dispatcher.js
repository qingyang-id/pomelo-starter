const crc = require('crc');

module.exports.dispatch = (uid, connectors) => {
  const index = Math.abs(crc.crc32(uid)) % connectors.length;
  return connectors[index];
};
