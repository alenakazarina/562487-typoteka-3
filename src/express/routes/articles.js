'use strict';
const {Router} = require(`express`);
const {PageContent} = require(`./data`);

const articlesRouter = new Router();

const ArticlesRoutes = {
  CATEGORY: `/category/:id`,
  ADD: `/add`,
  EDIT: `/edit/:id`,
  ARTICLE: `/:id`
};

const Mode = {
  ADD: `add`,
  EDIT: `edit`
};

articlesRouter.get(ArticlesRoutes.CATEGORY, (req, res) => {
  const categoryPageContent = Object.assign({}, PageContent, {
    page: `category`,
    isAuth: false,
    activeCategory: 2
  });
  res.render(`publications-by-category`, categoryPageContent);
});

articlesRouter.get(ArticlesRoutes.ADD, (req, res) => {
  const addPostPageContent = Object.assign({}, PageContent, {
    page: `add-post`,
    isAdmin: true,
    mode: Mode.ADD
  });
  res.render(`admin-add-new-post`, addPostPageContent);
});

articlesRouter.get(ArticlesRoutes.EDIT, (req, res) => {
  const editPostPageContent = Object.assign({}, PageContent, {
    page: `edit-post`,
    isAdmin: true,
    mode: Mode.EDIT,
    post: {
      title: `Как правильно заводить машину`,
      date: `21.03.2019`,
      picture: `moya_mashinka.jpg`,
      text: `Основатели Google Ларри Пейдж и Сергей Брин отойдут от руководства материнским холдингом Alphabet, сказано в сообщении компании. Пейдж занимал пост гендиректора, а Брин — президента Alphabet.`,
      announce: `Материнский холдинг возглавит гендиректор Google Сундар Пичаи. При этом больше половины голосов в компании останется у Пейджа и Брина.`
    }
  });
  res.render(`admin-edit-post`, editPostPageContent);
});

articlesRouter.get(ArticlesRoutes.ARTICLE, (req, res) => {
  const postPageContent = Object.assign({}, PageContent, {
    page: `post`,
    isAuth: true,
    comments: [5],
    post: {
      picture: `picture`
    }
  });
  res.render(`post`, postPageContent);
});

module.exports = {
  articlesRouter
};
