const express = require('express');
const expressWinston = require('express-winston');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const winston = require('winston');
const routes = require('./routes');
const logger = require('./logger');

const app = express();
const port = 3000;
const contextPath = '/';

app.disable('x-powered-by');
app.use(express.json());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
      const {
        timestamp, level, message, ...args
      } = info;

      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 0) : ''}`;
    }),
  ),
  meta: false,
  msg: 'HTTP  ',
  expressFormat: true,
  colorize: true,
  ignoreRoute: () => false,
}));

const openAPIDocument = YAML.load('./openapi/openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPIDocument));
app.use(contextPath, routes);

app.listen(port, () => {
  logger.info(`Example app listening at http://localhost:${port}`);
});
