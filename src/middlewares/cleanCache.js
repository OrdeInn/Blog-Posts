const { clearHash } = require('../services/cache');

cleanCacheMid = async (req, res, next) => {
  await next();

  clearHash(req.params.userId);
};

module.exports = {
  cleanCache: cleanCacheMid
}
