const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');  // Import path module
const {PORT, API_URL} = process.env
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the application',
    },
    servers: [
      {
        url: `${API_URL}:${PORT}/`,
      },
    ],
    components: {
      securitySchemes: {
        // Define the JWT token security scheme
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, 'routes/**/*.js')], // Adjusted to ensure it finds all route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
