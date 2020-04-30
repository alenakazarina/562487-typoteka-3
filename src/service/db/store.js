'use strict';
const {readArticles, readCategories} = require(`./helpers`);
const {Article, Comment} = require(`./models`);

class Store {
  constructor() {
    this._articles = [];
    this._categories = [];
  }

  get articles() {
    return this._articles;
  }

  get categories() {
    return this._categories;
  }

  async init() {
    try {
      this._articles = await readArticles();
      this._categories = await readCategories();
    } catch (err) {
      console.error(err);
    }
  }

  async getArticles() {
    return this.articles;
  }

  async getCategories() {
    return this.categories;
  }

  async createArticle(newArticle) {
    const storeArticle = new Article(newArticle);
    this.articles.push(storeArticle);
    return storeArticle;
  }

  async getArticleById(articleId) {
    return this.articles.find((article) => article.id === articleId);
  }

  async updateArticle(articleId, updatedFields) {
    const article = this.articles.find((storeArticle) => storeArticle.id === articleId);
    if (!article) {
      return null;
    }
    if (updatedFields[`title`]) {
      article[`title`] = updatedFields[`title`];
    }
    if (updatedFields[`announce`]) {
      article[`announce`] = updatedFields[`announce`];
    }
    if (updatedFields[`description`]) {
      article[`fullText`] = updatedFields[`description`];
    }
    if (updatedFields[`date`]) {
      article[`createdDate`] = updatedFields[`date`];
    }
    if (updatedFields[`category`]) {
      article[`category`] = updatedFields[`category`];
    }
    return article;
  }

  async deleteArticle(articleId) {
    const index = this.articles.findIndex((storeArticle) => storeArticle.id === articleId);
    if (index === -1) {
      return null;
    }
    const article = this.articles.splice(index, 1)[0];
    return article;
  }

  async addComment(articleId, newComment) {
    const comment = new Comment(newComment);
    const article = this.articles.find((storeArticle) => storeArticle.id === articleId);

    if (!article) {
      return null;
    }

    article.comments.push(comment);
    return comment;
  }

  async deleteComment(articleId, commentId) {
    const article = this.articles.find((storeArticle) => storeArticle.id === articleId);

    if (!article) {
      return null;
    }

    const index = article.comments.findIndex((articleComment) => articleComment.id === commentId);

    if (index === -1) {
      return null;
    }

    const comment = article.comments.splice(index, 1);
    return comment;
  }

  async search(query) {
    const searchingString = query.split(`-`).join(` `).toLowerCase();
    return (
      this.articles
        .filter((storeArticle) => {
          const lowerCaseTitle = storeArticle.title.toLowerCase();
          return lowerCaseTitle.includes(searchingString);
        })
    );
  }
}

module.exports = {
  Store
};
