'use strict';

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

const generateDates = () => Array.from({length: 10}, () => {
  const date = new Date();
  date.setMonth(date.getMonth() - getRandomInteger(1, 3));
  date.setDate(date.getDate() + getRandomInteger(1, 10));
  date.setHours(date.getHours() + getRandomInteger(1, 10));
  date.setMinutes(date.getMinutes() + getRandomInteger(1, 10));
  date.setSeconds(date.getSeconds() - getRandomInteger(1, 10));
  return formatDate(date);
});

module.exports = {
  shuffle,
  getRandomInteger,
  formatDate,
  generateDates
};
