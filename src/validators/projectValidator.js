const Joi = require('joi');

const createProjectValidator = Joi.object({
  title: Joi.string().required().trim().min(3).max(100),
  description: Joi.string().max(2000).optional().allow(null, ''),
  githubRepos: Joi.array()
    .items(
      Joi.object({
        repoName: Joi.string().required(),
        repoUrl: Joi.string().uri().required(),
      })
    )
    .optional()
    .allow(null),
  deploymentUrl: Joi.string().uri().optional().allow(null, ''),
  techStack: Joi.array().items(Joi.string()).required().min(1),
});

const updateProjectValidator = Joi.object({
  title: Joi.string().trim().min(3).max(100).optional(),
  description: Joi.string().max(2000).optional().allow(null, ''),
  githubRepos: Joi.array()
    .items(
      Joi.object({
        repoName: Joi.string().required(),
        repoUrl: Joi.string().uri().required(),
      })
    )
    .optional()
    .allow(null),
  deploymentUrl: Joi.string().uri().optional().allow(null, ''),
  techStack: Joi.array().items(Joi.string()).optional().min(1),
});

module.exports = {
  createProjectValidator,
  updateProjectValidator,
};