'use strict';
const express = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {Commands, InputData, HttpCode, DataPath} = require(`../const`);

module.exports = {
  name: Commands.SERVER,
  run: (count) => {
    const port = parseInt(count, 10) || InputData.DEFAULT_PORT;

    const server = express();
    server.use(express.json());

    server.get(`/posts`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(DataPath.OUT);
        if (fileContent.length) {
          const mocks = JSON.parse(fileContent);
          res.json(mocks);
        } else {
          res.json([]);
        }
      } catch (err) {
        if (err.code === `ENOENT`) {
          res.json([]);
        } else {
          res
            .status(HttpCode.INTERNAL_SERVER_ERROR)
            .send(err);
        }
      }
    });

    server.use((req, res) => {
      res.status(HttpCode.NOT_FOUND)
        .send(`Not Found`);
    });

    server.listen(port, () => {
      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
