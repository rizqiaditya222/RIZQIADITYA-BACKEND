const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'Backend API Documentation for Rizqi Aditya Portfolio',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
      {
        url: 'https://api.rizqiaditya.com',
        description: 'Production Server',
      },
    ],

    components: {
      schemas: {
        /* =======================
           GLOBAL RESPONSE
        ======================= */
        ApiResponseSuccess: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Success' },
            data: { nullable: true },
          },
        },

        ApiResponseError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            errors: {
              type: 'array',
              items: { type: 'string' },
              example: ['Validation error'],
            },
          },
        },

        /* =======================
           COMMENT
        ======================= */
        Comment: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '65fabc123456' },
            storyId: { type: 'string', example: '65fab9998888' },
            comment: { type: 'string', example: 'Keren banget 🔥' },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-01T10:00:00Z',
            },
          },
        },

        /* =======================
           MESSAGE
        ======================= */
        Message: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66abc123' },
            message: { type: 'string', example: 'Halo Rizqi 👋' },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-01T11:00:00Z',
            },
          },
        },

        /* =======================
           PROJECT
        ======================= */
        Project: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66proj123' },
            photoUrl: {
              type: 'string',
              example: 'uploads/project-1.png',
            },
            title: { type: 'string', example: 'My Portfolio App' },
            githubRepos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  repoName: { type: 'string', example: 'portfolio-backend' },
                  repoUrl: {
                    type: 'string',
                    example: 'https://github.com/rizqi/portfolio',
                  },
                },
              },
            },
            deploymentUrl: {
              type: 'string',
              nullable: true,
              example: 'https://portfolio.rizqiaditya.com',
            },
            techStack: {
              type: 'array',
              items: { type: 'string' },
              example: ['Node.js', 'Express', 'MongoDB'],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-01T12:00:00Z',
            },
          },
        },

        /* =======================
           STORY
        ======================= */
        Story: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '77story123' },
            photoUrl: {
              type: 'string',
              example: 'uploads/story-1.jpg',
            },
            caption: {
              type: 'string',
              nullable: true,
              example: 'Ngoding malam 🌙',
            },
            location: {
              type: 'string',
              example: 'Malang',
            },
            isVisible: {
              type: 'boolean',
              example: true,
            },
            comments: {
              type: 'array',
              items: { $ref: '#/components/schemas/Comment' },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-01T09:00:00Z',
            },
          },
        },

        /* =======================
           STATISTIC
        ======================= */
        Statistic: {
          type: 'object',
          properties: {
            date: { type: 'string', example: '2025-01-01' },
            todayVisit: { type: 'number', example: 120 },
            todayComment: { type: 'number', example: 10 },
            todayMessage: { type: 'number', example: 4 },
          },
        },
      },
    },
  },

  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
