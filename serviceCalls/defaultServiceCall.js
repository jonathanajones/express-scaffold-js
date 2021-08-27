const axios = require('axios').default;

const url = 'http://localhost:3000/foo';

module.exports = async (req) => {
  const timeStart = +new Date(Date.now());
  const params = { headers: { 'Content-Type': 'application/json' } };
  const response = await axios.get(url, params);
  req.myLoggingProperty = { duration: +new Date(Date.now()) - timeStart };
  return response.data;
};
