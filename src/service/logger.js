'use strict';
const {LOG_LEVEL} = require(`./config`);
const pino = require(`pino`);

const logLevel = LOG_LEVEL || `info`;
const LOGS_DEST = `./src/service/logs/${logLevel}.log`;

let logger = pino();

logger = pino(
    {
      levelFirst: true,
      level: logLevel || `info`
    },
    LOGS_DEST
);

module.exports = {
  getLogger(options = {}) {
    return logger.child(options);
  }
};
