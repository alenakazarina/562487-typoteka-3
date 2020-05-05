'use strict';
const express = require(`express`);
const {Commands, HttpCode} = require(`../const`);
const {API} = require(`../api/api`);
const {readArticles, readCategories} = require(`../utils/helpers`);
const {Store} = require(`../db/store`);
const {PORT} = require(`../config`);
const {getLogger} = require(`../logger`);
const logger = getLogger({name: `server`});

const startRequest = (req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
};

module.exports = {
  name: Commands.SERVER,
  run: async (userPort) => {
    const articles = await readArticles();
    const categories = await readCategories();
    const store = new Store(articles, categories);
    const api = new API(store);

    const port = userPort || PORT;
    const server = express();
    server.use(startRequest);
    server.use(express.json());
    server.use(`/api`, api.start());

    server.use((req, res) => {
      res
        .status(HttpCode.NOT_FOUND)
        .send({message: `Not found`});
      logger.error(`End request with error ${res.statusCode}`);
    });

    server
      .listen(port, () => {
        logger.info(`Server listening on port: ${port}`);
      })
      .on(`error`, (err) => {
        logger.error(`Server can't start. Error: ${err}`);
      });
  }
};
