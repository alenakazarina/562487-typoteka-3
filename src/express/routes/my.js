'use strict';
const {Router} = require(`express`);
const {PageContent} = require(`./data`);

const myRoutes = {
  ROOT: `/`,
  COMMENTS: `/comments`
};

const myRouter = new Router();

myRouter.get(myRoutes.ROOT, (req, res) => {
  const myPageContent = Object.assign({}, PageContent, {
    page: `my-publications`,
    isAdmin: true
  });
  res.render(`admin-publications`, myPageContent);
});

myRouter.get(myRoutes.COMMENTS, (req, res) => {
  const commentsPageContent = Object.assign({}, PageContent, {
    page: `my-comments`,
    isAdmin: true
  });
  res.render(`admin-comments`, commentsPageContent);
});

module.exports = {
  myRouter
};
