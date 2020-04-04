'use strict';
const chalk = require(`chalk`);
const {readData, writeData, getPath} = require(`../utils/common`);
const {getRandomItem, getRandomItems, getRandomText, getRandomDate} = require(`../utils/generate`);
const {InputData, Commands, DataPath, DataFiles} = require(`../const`);

const generateOffers = (categories, sentences, titles, count) => {
  return Array.from({length: count}, () => {
    const announceText = getRandomText(sentences, InputData.MAX_TEXT_LENGTH);
    const otherSentences = sentences.filter((sentence) => announceText.includes(sentence) === false);
    const otherText = getRandomText(otherSentences, otherSentences.length - 1);
    return {
      title: getRandomItem(titles),
      announce: announceText,
      fullText: announceText.concat(otherText),
      createdDate: getRandomDate(),
      category: getRandomItems(categories)
    };
  });
};

module.exports = {
  name: Commands.GENERATE,
  run: async (count) => {
    const offersCount = Number.parseInt(count, 10) || InputData.DEFAULT_COUNT;

    if (count > InputData.MAX_COUNT) {
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
