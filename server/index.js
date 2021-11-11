const next = require('next');
const express = require('express');
const path = require('path');

const chalk = require('chalk');
const boxen = require('boxen');

const appConfig = require('../app.config');
const routes = require('./routes');
const devProxy = require('./proxy');

const port = process.env.PORT || appConfig.serverPort || 3000;
const dev = process.env.NODE_ENV !== 'production';
const logger = console.log;

/**
 * OPTIONS
 */
const boxOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'gray',
};

const listenMessage = (p = port) =>
  chalk.gray(
    `
  API server is running at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}
  ${chalk.green.bold('API Healthcheck')} → ${chalk.green(`http://localhost:${p}/api/healthcheck`)}
  ${chalk.green.bold('Web')} → ${chalk.green(`http://localhost:${p}`)} 
`,
  );

/**
 * ROUTING
 */
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  app.setAssetPrefix(process.env.STATIC_PATH);
  server.use(express.static(path.join(__dirname, '../public/static')));

  if (process.env.PROXY_MODE === 'local') {
    // eslint-disable-next-line global-require
    const proxyMiddleware = require('http-proxy-middleware');
    Object.keys(devProxy).forEach((context) => {
      server.use(proxyMiddleware(context, devProxy[context]));
    });
  }

  server.get('/api/healthcheck', (req, res) => {
    res.sendStatus(200);
  });

  server.all('*', (req, res) => handler(req, res));

  server.listen(port, (err) => {
    if (err) {
      throw err.message;
    }
    logger(boxen(listenMessage(), boxOptions));
  });
});
