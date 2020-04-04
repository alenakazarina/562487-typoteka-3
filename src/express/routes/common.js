'use strict';
const {Router} = require(`express`);

const Routes = {
  ROOT: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  SEARCH: `/search`,
  CATEGORIES: `/categories`
};

const commonRouter = new Router();

commonRouter.get(Routes.ROOT, (req, res) => {
  res.send(Routes.ROOT);
});

commonRouter.get(Routes.REGISTER, (req, res) => {
  res.send(Routes.REGISTER);
});

commonRouter.get(Routes.LOGIN, (req, res) => {
  res.send(Routes.LOGIN);
});

commonRouter.get(Routes.SEARCH, (req, res) => {
  res.send(Routes.SEARCH);
});

commonRouter.get(Routes.CATEGORIES, (req, res) => {
  res.send(Routes.CATEGORIES);
});

module.exports = {
  commonRouter
};
