'use strict';
const fs = require(`fs`);
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

module.exports = {
  name: `--generate`,
  run: (count) => {
    const offersCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (count > MAX_INPUT_COUNT) {
      console.error(`Не больше 1000 публикаций`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(offersCount));
    const mockFilePath = `./mocks.json`;

    fs.writeFile(mockFilePath, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.ERROR);
      }
      console.info(`Operation success. File created: ${mockFilePath}`);
    });
  }
};
