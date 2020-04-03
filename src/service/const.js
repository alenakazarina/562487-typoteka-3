'use strict';

const DEFAULT_COUNT = 1;
const MAX_INPUT_COUNT = 1000;

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
  TITLES: `titles.txt`
};

module.exports = {
  DEFAULT_COUNT,
  MAX_INPUT_COUNT,
  Commands,
  DataPath,
  DataFiles
};
