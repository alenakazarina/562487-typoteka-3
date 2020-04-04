'use strict';
const {readFile, writeFile} = require(`fs`).promises;
const chalk = require(`chalk`);
const {DataPath} = require(`../const`);

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
  getPath,
  readData,
  writeData
};
