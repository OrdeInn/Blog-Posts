const { clearHash } = require('../services/cache');

cleanCacheMid = async (req, res, next) => {
  await next();

  clearHash(req.userId);
};

module.exports = {
  cleanCache: cleanCacheMid
}
