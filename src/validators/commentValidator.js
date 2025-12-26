const Joi = require('joi');

const createCommentValidator = Joi.object({
  storyId: Joi.string().hex().length(24).required(),
  comment: Joi.string().required().trim().min(1).max(500),
});

module.exports = {
  createCommentValidator,
};
