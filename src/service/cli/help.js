'use strict';
const chalk = require(`chalk`);

const SERVICE = `server <command>`;
const COMMANDS = [
  `--version              выводит номер версии`,
  `--help                 печатает этот текст`,
  `--generate <count>     формирует файл mocks.json`
];

module.exports = {
  name: `--help`,
  run: () => {
    console.info(`
      ${chalk.magentaBright(`Программа запускает http-сервер и формирует файл с данными для API.`)}\n
      ${chalk.yellow(`Гайд:`)}
      ${chalk.green(SERVICE)}\n
      ${chalk.yellow(`Команды:`)}${COMMANDS.map((command) => chalk.green(`\n\t${command}`))}
    `);
  }
};
