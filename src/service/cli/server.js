'use strict';
const express = require(`express`);
const chalk = require(`chalk`);
const {Commands, InputData, HttpCode} = require(`../const`);
const {api} = require(`../api/api`);

module.exports = {
  name: Commands.SERVER,
  run: (count) => {
    const port = parseInt(count, 10) || InputData.DEFAULT_PORT;
    const server = express();
    server.use(express.json());
    server.use(`/api`, api);

    server.use((req, res) => {
      res
        .status(HttpCode.NOT_FOUND)
        .send({message: `Not found`});
    });

    server
      .listen(port, () => {
        console.info(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on(`error`, (err) => {
        console.error(`Server can't start. Error: ${err}`);
      });
  }
};
