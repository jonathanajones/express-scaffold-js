const Joi = require('joi');

const defaultSchema = Joi.object({
  param: Joi.string().required(),
});

module.exports = {
  defaultValidation: (req) => defaultSchema.validate(req.query),
};
