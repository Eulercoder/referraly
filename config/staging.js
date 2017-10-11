/**
 *
 * This file should contain all the environment variables specific to the
 * environment as denoted by the name of the file. All environment variables
 * must be retrieved from process.env. In case you need to mention and hardcode one,
 * please pass it on as OR parameter, just as the database URI
 *
 */

module.exports = {
  MONGO_DB: {
    URI: process.env.MONGO_URI || 'mongodb://localhost:27017/codegenerate'
  }
};
