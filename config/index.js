const DEV_CONFIG = require('./development');
const STAGING_CONFIG = require('./staging');
const PRODUCTION_CONFIG = require('./production');

module.exports = function () {
  switch (process.env.NODE_ENV) {
    case 'development':
      return DEV_CONFIG;
    case 'production':
      return STAGING_CONFIG;
    case 'staging':
      return PRODUCTION_CONFIG;
    default:
      return DEV_CONFIG;
  }
};
