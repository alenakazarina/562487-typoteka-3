'use strict';
const {Cli} = require(`./cli`);
const {Commands} = require(`./const`);

const run = async () => {
  const [, , userCommand, count] = process.argv;
  if (!userCommand || !Cli[userCommand]) {
    return Cli[Commands.HELP].run();
  }
  if (userCommand === Commands.GENERATE) {
    return Cli[userCommand].run(count);
  }
  return Cli[userCommand].run();
};

run();
