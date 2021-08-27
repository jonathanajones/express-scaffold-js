const router = require('express').Router();
const defaultRoute = require('./defaultRoute');

const routes = () => {
  router.get('/', defaultRoute);
  router.get('/foo', (req, res) => res.status(200).json({ importantProperty: 'ok' }));
  return router;
};

module.exports = routes();
