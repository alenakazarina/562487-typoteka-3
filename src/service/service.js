'use strict';
const {Cli} = require(`./cli`);
const {DEFAULT_COMMAND} = require(`./const`);
const inquirer = require(`inquirer`);

const enterCommand = () => {
  return inquirer.prompt({
    name: `userCommand`,
    type: `list`,
    message: `Enter command to run:`,
    choices: [
      `--version`,
      `--generate`,
      `--help`
    ]
  });
};

const enterCount = () => {
  return inquirer.prompt({
    name: `count`,
    type: `input`,
    message: `Enter publications count:`,
    validate: (count) => parseInt(count, 10) ? true : `Please, enter publications count`
  });
};

const run = async () => {
  const {userCommand} = await enterCommand();

  if (userCommand === `undefined` || !Cli[userCommand]) {
    Cli[DEFAULT_COMMAND].run();
  } else if (userCommand === `--generate`) {
    const {count} = await enterCount();
    Cli[userCommand].run(count);
  } else {
    Cli[userCommand].run();
  }
};

run();
