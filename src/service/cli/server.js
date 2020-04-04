'use strict';
const http = require(`http`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {Commands, InputData, HttpCode, DataPath} = require(`../const`);

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Типотека</title>
      </head>
      <body>
        ${message}
      </body>
    </html>
  `.trim();
  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-type': `text/html; charset=UTF-8`
  });
  res.end(template);
};

const onClientRequest = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(DataPath.OUT);
        const articles = JSON.parse(fileContent);
        const message = articles.map((article) => `<li>${article.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, `<p>Not Found</p>`);
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, `<p>Not Found</p>`);
      break;
  }
};

module.exports = {
  name: Commands.SERVER,
  run: (count) => {
    const port = parseInt(count, 10) || InputData.DEFAULT_PORT;

    http.createServer(onClientRequest)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(`Ошибка при создании сервера`, err);
        }
        return console.info(chalk.green(`Ожидаю соединений на ${port}`));
      });
  }
};
