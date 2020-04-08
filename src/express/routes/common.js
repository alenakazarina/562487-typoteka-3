'use strict';
const {Router} = require(`express`);
const {arrayMock, PageContent} = require(`./data`);

const Routes = {
  ROOT: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  SEARCH: `/search`,
  CATEGORIES: `/categories`
};

const commonRouter = new Router();

commonRouter.get(Routes.ROOT, (req, res) => {
  const rootPageContent = Object.assign({}, PageContent, {
    page: `main`,
    isAuth: false,
    articles: arrayMock,
    comments: arrayMock,
    activeCategory: -1,
    lastListItems: arrayMock,
    hotListItems: arrayMock
  });
  res.render(`main`, rootPageContent);
});

commonRouter.get(Routes.REGISTER, (req, res) => {
  const registerPageContent = Object.assign({}, PageContent, {
    page: `register`,
    isAuth: false,
    loginError: {
      email: false,
      password: false
    },
    errors: []
  });
  res.render(`login`, registerPageContent);
});

commonRouter.get(Routes.LOGIN, (req, res) => {
  const loginPageContent = Object.assign({}, PageContent, {
    page: `login`,
    isAuth: false,
    loginError: {
      email: false,
      password: false
    },
    errors: []
  });
  res.render(`login`, loginPageContent);
});

commonRouter.get(Routes.SEARCH, (req, res) => {
  const searchPageContent = Object.assign({}, PageContent, {
    page: `search`,
    isAdmin: true,
    searchResults: arrayMock,
    keyWord: `Путешествия`
  });
  res.render(`search`, searchPageContent);
});

commonRouter.get(Routes.CATEGORIES, (req, res) => {
  const categoriesPageContent = Object.assign({}, PageContent, {
    page: `categories`,
    isAdmin: true
  });
  res.render(`admin-categories`, categoriesPageContent);
});

module.exports = {
  commonRouter
};
