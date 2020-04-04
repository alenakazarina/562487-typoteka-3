'use strict';
const express = require(`express`);
const {commonRouter} = require(`./routes/common`);
const {articlesRouter} = require(`./routes/articles`);
const {myRouter} = require(`./routes/my`);

const PORT = 8080;
const server = express();
server.use(`/`, commonRouter);
server.use(`/articles`, articlesRouter);
server.use(`/my`, myRouter);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
