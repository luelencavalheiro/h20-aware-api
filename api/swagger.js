require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/*.js'];

const host = `${process.env.VERCEL_URL}:${process.env.PORT}`;

const doc = {
    info: {
        title: 'H20 Aware API',
        description: 'API documentation',
        version: '1.0.0',
    },
    host,
    basePath: '/',
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated');
});