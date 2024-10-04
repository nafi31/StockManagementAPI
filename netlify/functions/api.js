const { createServer, Proxy } = require('aws-serverless-express'); // Import AWS serverless express

const app = require('./dist/src/main.js'); // Import your NestJS application

const server = createServer(app);

exports.handler = (event, context) => {
  return Proxy(server, event, context); // Proxy the request to your NestJS app
};
