'use strict';

const request = require(`supertest`);
const express = require(`express`);
const {API} = require(`./api`);
const {Store} = require(`../db/store`);
const mocks = require(`./api-mocks`);

const Ids = {
  ARTICLE: `1`,
  COMMENT: `1`,
  ARTICLE_DEL: `2`,
  COMMENT_DEL: `2`,
  ARTICLE_NOT_FOUND: `3`,
  COMMENT_NOT_FOUND: `3`
};

const Paths = {
  ARTICLES: `/api/articles`,
  ARTICLE: `/api/articles/${Ids.ARTICLE}`,
  CATEGORIES: `/api/categories`,
  COMMENTS: `/api/articles/${Ids.ARTICLE}/comments`,
  COMMENT: `/api/articles/${Ids.ARTICLE}/comments/${Ids.COMMENT}`,
  SEARCH: `/api/search?query=борьба`,
  ARTICLE_DEL: `/api/articles/${Ids.ARTICLE_DEL}`,
  COMMENT_DEL: `/api/articles/${Ids.ARTICLE}/comments/${Ids.COMMENT_DEL}`,
  ARTICLE_NOT_FOUND: `/api/articles/${Ids.ARTICLE_NOT_FOUND}`,
  COMMENTS_NOT_FOUND: `/api/articles/${Ids.ARTICLE_NOT_FOUND}/comments`,
  COMMENT_NOT_FOUND: `/api/articles/${Ids.ARTICLE}/comments/${Ids.COMMENT_NOT_FOUND}`,
  SEARCH_EMPTY: `/api/search?query=`
};

let server = null;
const store = new Store(mocks.articles, mocks.categories);
const api = new API(store);
const app = express();

app.use(express.json());
app.use(`/api`, api.start());
app.use((req, res) => {
  res
    .status(404)
    .send({message: `not found`});
});
server = app.listen(3000);

afterAll(() => {
  server.close();
});

describe(`api`, () => {
  describe(`GET articles`, () => {
    test(`When get articles status code should be 200`, async () => {
      const res = await request(app).get(Paths.ARTICLES);
      expect(res.statusCode).toBe(200);
    });
  });

  describe(`GET categories`, () => {
    test(`When get categories status code should be 200`, async () => {
      const res = await request(app).get(Paths.CATEGORIES);
      expect(res.statusCode).toBe(200);
    });
  });

  describe(`GET article`, () => {
    test(`When get article status code should be 200`, async () => {
      const res = await request(app).get(Paths.ARTICLE);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(`id`);
      expect(res.body).toHaveProperty(`title`);
      expect(res.body).toHaveProperty(`announce`);
      expect(res.body).toHaveProperty(`fullText`);
      expect(res.body).toHaveProperty(`category`);
      expect(res.body).toHaveProperty(`comments`);
    });

    test(`When get article error 404`, async () => {
      const res = await request(app).get(Paths.ARTICLE_NOT_FOUND);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`GET article comments`, () => {
    test(`When get article comments status code should be 200`, async () => {
      const res = await request(app).get(Paths.COMMENTS);
      expect(res.statusCode).toBe(200);
    });

    test(`When get article comments error 404`, async () => {
      const res = await request(app).get(Paths.COMMENTS_NOT_FOUND);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`GET search`, () => {
    test(`When get search status code should be 200`, async () => {
      const searchPath = encodeURI(Paths.SEARCH);
      const res = await request(app).get(searchPath);
      expect(res.statusCode).toBe(200);
    });

    test(`When get search error 400`, async () => {
      const searchPath = encodeURI(Paths.SEARCH_EMPTY);
      const res = await request(app).get(searchPath);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`PUT article`, () => {
    test(`When update article status code should be 200`, async () => {
      const res = await request(app).put(Paths.ARTICLE).send(mocks.updateData);
      expect(res.statusCode).toBe(200);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(`title`, `Искусственный интеллект в реальной жизни.`);
      expect(res.body).toHaveProperty(`category`, [`IT`]);
    });

    test(`When update article error 400`, async () => {
      const res = await request(app).put(Paths.ARTICLE).send(mocks.updateFalseData);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`POST article`, () => {
    test(`When post article status code should be 201`, async () => {
      const res = await request(app).post(Paths.ARTICLES).send(mocks.articleData);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(`id`);
      expect(res.body).toHaveProperty(`title`, mocks[`articleData`][`title`]);
      expect(res.body).toHaveProperty(`announce`, mocks[`articleData`][`announce`]);
      expect(res.body).toHaveProperty(`fullText`, mocks[`articleData`][`description`]);
      expect(res.body).toHaveProperty(`createdDate`, mocks[`articleData`][`date`]);
      expect(res.body).toHaveProperty(`category`, mocks[`articleData`][`category`]);
      expect(res.body).toHaveProperty(`comments`);
    });

    test(`When post article error 400`, async () => {
      const res = await request(app).post(Paths.ARTICLES).send(mocks.articleFalseData);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`POST article comment`, () => {
    test(`When post article comment status code should be 201`, async () => {
      const res = await request(app).post(Paths.COMMENTS).send(mocks.commentData);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(`id`);
      expect(res.body).toHaveProperty(`text`, mocks[`commentData`][`text`]);
    });

    test(`When post article comment error 400`, async () => {
      const res = await request(app).post(Paths.COMMENTS).send(mocks.commentFalseData);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`DELETE article`, () => {
    test(`When delete article status code should be 200`, async () => {
      const res = await request(app).delete(Paths.ARTICLE_DEL);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(`id`, Ids.ARTICLE_DEL);
    });

    test(`When delete article error 404`, async () => {
      const res = await request(app).delete(Paths.ARTICLE_NOT_FOUND);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`DELETE article comment`, () => {
    test(`When delete article comment status code should be 200`, async () => {
      const res = await request(app).delete(Paths.COMMENT_DEL);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(`id`, Ids.COMMENT_DEL);
    });

    test(`When delete article comment error 404`, async () => {
      const res = await request(app).delete(Paths.COMMENT_NOT_FOUND);
      expect(res.statusCode).toBe(404);
    });
  });
});

