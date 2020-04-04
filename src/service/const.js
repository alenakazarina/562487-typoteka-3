'use strict';

const InputData = {
  defaultCount: 1,
  maxCount: 1000,
  maxTextLength: 5
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
  TITLES: `titles.txt`
};

module.exports = {
  InputData,
  Commands,
  DataPath,
  DataFiles
};
