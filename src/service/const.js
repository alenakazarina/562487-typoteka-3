'use strict';
const InputData = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
  MAX_TEXT_LENGTH: 5,
  DEFAULT_PORT: 3000
};

const Commands = {
  VERSION: `--version`,
  GENERATE: `--generate`,
  HELP: `--help`,
  SERVER: `--server`
};

const DataPath = {
  IN: `./data/`,
  OUT: `./mocks.json`,
};

const DataFiles = {
  CATEGORIES: `categories.txt`,
  SENTENCES: `sentences.txt`,
  TITLES: `titles.txt`,
  COMMENTS: `comments.txt`
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

module.exports = {
  InputData,
  Commands,
  DataPath,
  DataFiles,
  HttpCode
};
