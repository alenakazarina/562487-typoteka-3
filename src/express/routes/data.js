'use strict';

const arrayMock = Array.from({length: 3}, (it, i) => i);

const PageContent = {
  title: `Типотека`,
  description: `Личный блог Типотека`,
  isAuth: true,
  isAdmin: false
};

module.exports = {
  arrayMock,
  PageContent
};
