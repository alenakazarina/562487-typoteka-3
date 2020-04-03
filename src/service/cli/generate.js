'use strict';
const chalk = require(`chalk`);
const {getRandomInteger, shuffle, readData, writeData, getPath} = require(`../utils/utils`);
const {DEFAULT_COUNT, MAX_INPUT_COUNT, Commands, DataPath, DataFiles} = require(`../const`);
const {ANNOUNCES_MAX_COUNT, DATES} = require(`../mock/mock`);

const generateOffers = (categories, sentences, titles, count) => {
  const announce = shuffle(sentences).slice(0, getRandomInteger(1, ANNOUNCES_MAX_COUNT)).join(` `);

  const sentencesWithoutAnnounce = sentences.filter((sentence) => announce.includes(sentence) === false);

  return Array.from({length: count}, () => ({
    "title": shuffle(titles)[getRandomInteger(0, titles.length - 1)],
    "announce": announce,
    "fullText": [announce, ...shuffle(sentencesWithoutAnnounce)].slice(0, getRandomInteger(1, sentences.length - 1)).join(` `),
    "createdDate": shuffle(DATES)[getRandomInteger(0, DATES.length - 1)],
    "category": shuffle(categories).slice(0, [getRandomInteger(1, categories.length - 1)])
  }));
};

module.exports = {
  name: Commands.GENERATE,
  run: async (count) => {
    const offersCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (count > MAX_INPUT_COUNT) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(1);
    }

    const categories = await readData(getPath(DataFiles.CATEGORIES));
    const sentences = await readData(getPath(DataFiles.SENTENCES));
    const titles = await readData(getPath(DataFiles.TITLES));
    const content = JSON.stringify(generateOffers(categories, sentences, titles, offersCount));

    await writeData(DataPath.OUT, content);
  }
};
