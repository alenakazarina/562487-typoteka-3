'use strict';
const chalk = require(`chalk`);
const {readData, writeData, getPath} = require(`../utils/common`);
const {getRandomInteger, shuffle, generateDates} = require(`../utils/generate`);
const {InputData, Commands, DataPath, DataFiles} = require(`../const`);

const generateOffers = (categories, sentences, titles, count) => {
  const announceText = shuffle(sentences).slice(0, getRandomInteger(1, InputData.maxTextLength)).join(` `);
  const sentencesWithoutAnnounce = sentences.filter((sentence) => announceText.includes(sentence) === false);
  const dates = generateDates();

  return Array.from({length: count}, () => ({
    title: shuffle(titles)[getRandomInteger(0, titles.length - 1)],
    announce: announceText,
    fullText: [announceText, ...shuffle(sentencesWithoutAnnounce)].slice(0, getRandomInteger(1, sentences.length - 1)).join(` `),
    createdDate: shuffle(dates)[getRandomInteger(0, dates.length - 1)],
    category: shuffle(categories).slice(0, [getRandomInteger(1, categories.length - 1)])
  }));
};

module.exports = {
  name: Commands.GENERATE,
  run: async (count) => {
    const offersCount = Number.parseInt(count, 10) || InputData.defaultCount;

    if (count > InputData.maxCount) {
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
