'use strict';
const {Router} = require(`express`);
const {HttpCode} = require(`../const`);
const {getLogger} = require(`../logger`);
const logger = getLogger({name: `rest-api`});

class API {
  constructor(store) {
    this._router = new Router();
    this._store = store;
  }

  getRoutes() {
    return {
      ARTICLES: `/articles`,
      ARTICLE: `/articles/:articleId`,
      CATEGORIES: `/categories`,
      COMMENTS: `/articles/:articleId/comments`,
      COMMENT: `/articles/:articleId/comments/:commentId`,
      SEARCH: `/search`
    };
  }

  getRequiredArticleFields() {
    return [
      `title`,
      `announce`,
      `description`,
      `date`,
      `category`
    ];
  }

  start() {
    const api = this._router;
    const store = this._store;
    const Paths = this.getRoutes();
    const requiredArticleFields = this.getRequiredArticleFields();

    api.get(Paths.ARTICLES, async (req, res) => {
      try {
        const articles = await store.getArticles();
        res.status(HttpCode.OK).json(articles);
        logger.info(`Get articles success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    api.get(Paths.ARTICLE, async (req, res) => {
      try {
        const {articleId} = req.params;
        const article = await store.getArticleById(articleId);

        if (!article) {
          res
            .status(HttpCode.NOT_FOUND)
            .send({message: `Article with id ${articleId} was not found`});
          logger.error(`Article with id ${articleId} was not found: ${res.statusCode}`);
          return;
        }

        res.status(HttpCode.OK).json(article);
        logger.info(`Get article ${articleId} success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    api.get(Paths.CATEGORIES, async (req, res) => {
      try {
        const categories = await store.getCategories();
        res.status(HttpCode.OK).json(categories);
        logger.info(`Get categories success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    api.post(Paths.ARTICLES, async (req, res) => {
      try {
        const newArticle = req.body;
        const hasRequiredPropsLength = Object.keys(newArticle).length === requiredArticleFields.length;

        if (!hasRequiredPropsLength) {
          res
            .status(HttpCode.BAD_REQUEST)
            .send({message: `Incorrect required fields count`});
          logger.error(`Create article error: ${res.statusCode}`);
          return;
        }

        for (let offerField of requiredArticleFields) {
          if (!newArticle[offerField]) {
            res
              .status(HttpCode.BAD_REQUEST)
              .send({message: `Missed article field: ${offerField}`});
            logger.error(`Create article error: ${res.statusCode}`);
            return;
          }
        }

        const article = await store.createArticle(newArticle);
        res.status(HttpCode.CREATED).json(article);
        logger.info(`Create offer ${article.id} success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    api.put(Paths.ARTICLE, async (req, res) => {
      try {
        const updatedFields = req.body;
        const {articleId} = req.params;

        const isNoUpdates = Object.keys(updatedFields).length === 0;
        const hasWrongFields = Object.keys(updatedFields).filter((field) => requiredArticleFields.includes(field) === false).length;

        if (isNoUpdates || hasWrongFields) {
          res
            .status(HttpCode.BAD_REQUEST)
            .send({message: `Update article ${articleId} error`});
          logger.error(`Update article ${articleId} error: ${res.statusCode}`);
          return;
        }

        const article = await store.updateArticle(articleId, updatedFields);

        if (!article) {
          res
            .status(HttpCode.NOT_FOUND)
            .send({message: `Article with id: ${articleId} was not found`});
          logger.error(`Update article ${articleId} error: ${res.statusCode}`);
          return;
        }

        res.status(HttpCode.OK).json(article);
        logger.info(`Update article ${articleId} success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    api.delete(Paths.ARTICLE, async (req, res) => {
      try {
        const {articleId} = req.params;
        const article = await store.deleteArticle(articleId);

        if (!article) {
          res
            .status(HttpCode.NOT_FOUND)
            .send({message: `Delete article ${articleId} error`});
          logger.error(`Delete article ${articleId} error: ${res.statusCode}`);
          return;
        }

        res.status(HttpCode.OK).json(article);
        logger.info(`Delete article ${articleId} success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    api.get(Paths.COMMENTS, async (req, res) => {
      try {
        const {articleId} = req.params;
        const article = await store.getArticleById(articleId);

        if (!article) {
          res
            .status(HttpCode.NOT_FOUND)
            .send({message: `Article with id: ${articleId} was not found`});
          logger.error(`Get article ${articleId} comments error: ${res.statusCode}`);
          return;
        }

        res.status(HttpCode.OK).json(article.comments);
        logger.info(`Get article ${articleId} comments success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    api.delete(Paths.COMMENT, async (req, res) => {
      try {
        const {articleId, commentId} = req.params;
        const comment = await store.deleteComment(articleId, commentId);

        if (!comment) {
          res
            .status(HttpCode.NOT_FOUND)
            .send({message: `Delete article ${articleId} comment ${commentId} 404`});
          logger.error(`Delete article ${articleId} comment ${commentId} error: ${res.statusCode}`);
          return;
        }

        res.status(HttpCode.OK).json(comment);
        logger.info(`Delete article ${articleId} comment ${commentId} success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    api.post(Paths.COMMENTS, async (req, res) => {
      try {
        const newComment = req.body;
        const {articleId} = req.params;

        const hasNoRequiredField = newComment.text === undefined;
        const comment = await store.addComment(articleId, newComment);

        if (!comment || hasNoRequiredField) {
          res
            .status(HttpCode.BAD_REQUEST)
            .send({message: `Create article ${articleId} comment error`});
          logger.error(`Create article ${articleId} comment error: ${res.statusCode}`);
          return;
        }

        res.status(HttpCode.CREATED).json(comment);
        logger.info(`Create article ${articleId} comment ${comment.id} success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    api.get(Paths.SEARCH, async (req, res) => {
      try {
        const {query} = req.query;

        if (!query) {
          res
            .status(HttpCode.BAD_REQUEST)
            .send({message: `Missed search query`});
          logger.error(`Get search error: ${res.statusCode}`);
          return;
        }

        const searchResults = await store.search(query);
        res.status(HttpCode.OK).json(searchResults);
        logger.info(`Get search - ${query} - success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    const onError = (err, res) => {
      res.status(HttpCode.INTERNAL_SERVER_ERROR);
      logger.error(err);
    };
    return api;
  }
}

module.exports = {
  API
};
