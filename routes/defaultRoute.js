const logger = require('../logger');
const { defaultValidation: validate } = require('./validation');
const { getDefaultData } = require('../services/defaultService');

module.exports = async (req, res) => {
  const { error } = validate(req);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const response = await getDefaultData(req);
    logger.info(req.myLoggingProperty);
    return res.status(200).send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};
