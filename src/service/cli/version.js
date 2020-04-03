'use strict';
const chalk = require(`chalk`);
const packageJsonFile = require(`../../../package.json`);
const {Commands} = require(`../const`);

module.exports = {
  name: Commands.VERSION,
  run: () => {
    const {version} = packageJsonFile;
    console.info(chalk.blue(version));
  }
};
