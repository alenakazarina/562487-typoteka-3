'use strict';
const {readFile, writeFile} = require(`fs`).promises;
const chalk = require(`chalk`);
const {DataPath} = require(`../const`);

const shuffle = (items) => {
  let shuffledArray = items.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  return shuffledArray;
};

const getRandomInteger = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

const formatDate = (date) => {
  return date.toISOString().split(`T`).join(` `).slice(0, 19);
};

const getPath = (filePath) => {
  return `${DataPath.IN}${filePath}`;
};

const readData = async (filePath) => {
  try {
    const data = await readFile(filePath, `utf-8`);
    return data.split(`\n`).filter((item) => item !== ``);
  } catch (err) {
    console.error(chalk.red(`Can't read data from file ${filePath}`));
    return process.exit(1);
  }
};

const writeData = async (path, content) => {
  try {
    await writeFile(path, content);
    console.info(chalk.green(`Operation success. File created: ${path}`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file...`));
    process.exit(1);
  }
};

module.exports = {
  shuffle,
  getRandomInteger,
  formatDate,
  getPath,
  readData,
  writeData
};
