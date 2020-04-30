'use strict';
const {nanoid} = require(`nanoid`);

class User {
  constructor(user) {
    this.id = nanoid(6);
    this.name = user[`user-name`];
    this.email = user[`user-email`];
    this.password = user[`user-password`];
    this.avatar = user[`avatar`];
  }
}

class Article {
  constructor(article) {
    this.id = nanoid(6);
    this.title = article[`title`];
    this.announce = article[`announce`];
    this.fullText = article[`description`];
    this.createdDate = article[`date`];
    this.category = article[`category`];
    this.comments = [];
  }
}

class Comment {
  constructor(comment) {
    this.id = nanoid(6);
    this.text = comment[`text`];
  }
}

module.exports = {
  User,
  Article,
  Comment
};
