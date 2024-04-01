const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Review Application API',
      version: '1.0.0',
      description: 'API documentation for the Book Review Application',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update with your server URL
        description: 'Development server',
      },
    ],
    "components": {
      "schemas": {
        "Book": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "author": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "genre": {
              "type": "string"
            },
            "publishedYear": {
              "type": "number"
            }
          },
          "required": ["title", "author"]
        },
        "Review": {
          "type": "object",
          "properties": {
            "bookId": {
              "type": "string",
              "format": "ObjectId"
            },
            "userId": {
              "type": "string",
              "format": "ObjectId"
            },
            "rating": {
              "type": "number",
              "minimum": 1,
              "maximum": 5
            },
            "comment": {
              "type": "string"
            }
          },
          "required": ["bookId", "userId", "rating"]
        }
      }
    }
  },
  apis: ['./routes/*.js'], // Update with the path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
