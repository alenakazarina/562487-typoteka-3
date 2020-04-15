'use strict';
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {readData, writeData, getPath} = require(`../utils/common`);
const {getRandomItem, getRandomItems, getRandomText, getRandomDate, getRandomInteger} = require(`../utils/generate`);
const {InputData, Commands, DataPath, DataFiles} = require(`../const`);

const generateComments = (comments) => {
  const commentsCount = getRandomInteger(0, 5);
  return Array.from({length: commentsCount}, () => ({
    id: nanoid(6),
    text: getRandomText(comments, getRandomInteger(1, (comments.length - 1) / 2))
  }));
};

const generateOffers = (categories, sentences, titles, comments, count) => {
  return Array.from({length: count}, () => {
    const announceText = getRandomText(sentences, InputData.MAX_TEXT_LENGTH);
    const otherSentences = sentences.filter((sentence) => announceText.includes(sentence) === false);
    const otherText = getRandomText(otherSentences, otherSentences.length - 1);
    return {
      id: nanoid(6),
      title: getRandomItem(titles),
      announce: announceText,
      fullText: announceText.concat(otherText),
      createdDate: getRandomDate(),
      category: getRandomItems(categories),
      comments: generateComments(comments)
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
    const comments = await readData(getPath(DataFiles.COMMENTS));
    const content = JSON.stringify(generateOffers(categories, sentences, titles, comments, offersCount));

    await writeData(DataPath.OUT, content);
  }
};
