const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'API documentation for portfolio backend',
      contact: {
        name: 'Rizqi Aditya',
        url: 'https://rizqiaditya.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://api.rizqiaditya.com',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Story: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            photoUrl: { type: 'string' },
            location: { type: 'string' },
            isVisible: { type: 'boolean' },
            expiredAt: { type: 'string', format: 'date-time' },
            comments: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Comment: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            storyId: { type: 'string' },
            comment: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Project: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            photoUrl: { type: 'string' },
            title: { type: 'string' },
            githubRepos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  repoName: { type: 'string' },
                  repoUrl: { type: 'string' },
                },
              },
            },
            deploymentUrl: { type: 'string', nullable: true },
            techStack: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Message: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            message: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Statistic: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            date: { type: 'string', format: 'date' },
            todayVisit: { type: 'number' },
            todayComment: { type: 'number' },
            todayMessage: { type: 'number' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);