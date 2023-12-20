const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management Api',
      version: '1.0.0',
    },
  },
  apis:[path.resolve(__dirname, '../routes/user.routes.js')],
};


const specs = swaggerJsdoc(options);

module.exports = specs;
