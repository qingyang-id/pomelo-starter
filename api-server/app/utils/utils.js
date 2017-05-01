const utils = module.exports;

/**
 * Check and invoke callback function
 */
// utils.invokeCallback = function (cb) {
//   if (!!cb && typeof cb === 'function') {
//     cb.apply(null, Array.prototype.slice.call(arguments, 1));
//   }
// };

/**
 * clone an object
 */
utils.clone = function (origin) {
  if (!origin) {
    return null;
  }

  const obj = {};
  Object.keys(origin).forEach((f) => {
    obj[f] = origin[f];
  });

  return obj;
};

utils.size = function (obj) {
  if (!obj) {
    return 0;
  }

  return Object.keys(obj).length;
};
