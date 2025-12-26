const Joi = require('joi');

const createMessageValidator = Joi.object({
  message: Joi.string().required().trim().min(1).max(1000),
});

module.exports = {
  createMessageValidator,
};