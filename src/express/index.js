'use strict';
const express = require(`express`);
const path = require(`path`);
const {commonRouter} = require(`./routes/common`);
const {articlesRouter} = require(`./routes/articles`);
const {myRouter} = require(`./routes/my`);

const PORT = 8080;
const PUBLIC_DIR = `public`;
const server = express();

server.set(`views`, path.resolve(__dirname, `templates`));
server.set(`view engine`, `pug`);
server.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

server.use(`/`, commonRouter);
server.use(`/articles`, articlesRouter);
server.use(`/my`, myRouter);

server.use((req, res) => {
  const notFoundPageContent = {
    page: `404`,
    isAuth: false
  };
  res
    .status(`404`)
    .render(`404`, notFoundPageContent);
});

server.use((err, req, res) => {
  const errorPageContent = {
    page: `500`,
    isAuth: false
  };
  res
    .status(`500`)
    .render(`500`, errorPageContent);
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
