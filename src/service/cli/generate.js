'use strict';
const {writeFile} = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInteger, shuffle} = require(`../utils/utils`);
const {ExitCode} = require(`../const`);
const {
  ANNOUNCES_MAX_COUNT,
  TITLES,
  SENTENCES,
  CATEGORIES,
  DATES
} = require(`../mock/mock`);

const DEFAULT_COUNT = 1;
const MAX_INPUT_COUNT = 1000;

const generateOffers = (count) => {
  const announce = shuffle(SENTENCES).slice(0, getRandomInteger(1, ANNOUNCES_MAX_COUNT)).join(` `);
  const sentencesWithoutAnnounce = SENTENCES.filter((sentence) => announce.includes(sentence) === false);
  return Array.from({length: count}, () => ({
    "title": shuffle(TITLES)[getRandomInteger(0, TITLES.length - 1)],
    "announce": announce,
    "fullText": [announce, ...shuffle(sentencesWithoutAnnounce)].slice(0, getRandomInteger(1, SENTENCES.length - 1)).join(` `),
    "createdDate": shuffle(DATES)[getRandomInteger(0, DATES.length - 1)],
    "category": shuffle(CATEGORIES).slice(0, [getRandomInteger(1, CATEGORIES.length - 1)])
  }));
};

const createMockFile = async (path, content) => {
  try {
    await writeFile(path, content);
    console.info(chalk.green(`Operation success. File created: ${path}`));
  } catch (error) {
    console.error(chalk.red(`Can't write data to file...`));
    process.exit(ExitCode.ERROR);
  }
};

module.exports = {
  name: `--generate`,
  run: (count) => {
    const offersCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (count > MAX_INPUT_COUNT) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const mockFilePath = `./mocks.json`;
    const content = JSON.stringify(generateOffers(offersCount));
    createMockFile(mockFilePath, content);
  }
};
