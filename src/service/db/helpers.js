'use strict';
const fs = require(`fs`).promises;
const {getPath} = require(`../utils/common`);
const {DataPath, DataFiles} = require(`../const`);

const readArticles = async () => {
  try {
    const offersFileContent = await fs.readFile(DataPath.OUT);
    return offersFileContent.length ? JSON.parse(offersFileContent) : [];
  } catch (err) {
    return [];
  }
};

const readCategories = async () => {
  try {
    const categoriesFileContent = await fs.readFile(getPath(DataFiles.CATEGORIES), `utf-8`);
    return categoriesFileContent.length ? categoriesFileContent.split(`\n`).filter((item) => item !== ``) : [];
  } catch (err) {
    return [];
  }
};

module.exports = {
  readArticles,
  readCategories
};
