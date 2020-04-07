'use strict';
const {Router} = require(`express`);

const articlesRouter = new Router();

const ArticlesRoutes = {
  CATEGORY: `/category/:id`,
  ADD: `/add`,
  EDIT: `/edit/:id`,
  ARTICLE: `/:id`
};

articlesRouter.get(ArticlesRoutes.CATEGORY, (req, res) => {
  res.send(`/articles/category/${req.params.id}`);
});

articlesRouter.get(ArticlesRoutes.ADD, (req, res) => {
  res.send(`/articles${ArticlesRoutes.ADD}`);
});

articlesRouter.get(ArticlesRoutes.EDIT, (req, res) => {
  res.send(`/articles/edit/${req.params.id}`);
});

articlesRouter.get(ArticlesRoutes.ARTICLE, (req, res) => {
  res.send(`/articles/${req.params.id}`);
});

module.exports = {
  articlesRouter
};
