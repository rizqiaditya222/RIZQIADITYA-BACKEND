const Joi = require('joi');

const createStoryValidator = Joi.object({
  location: Joi.string().optional().allow(''),
});

const commentOnStoryValidator = Joi.object({
  comment: Joi.string().required().trim().min(1).max(500),
});

module.exports = {
  createStoryValidator,
  commentOnStoryValidator,
};