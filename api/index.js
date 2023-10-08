require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')
const swaggerDocument = require('./swagger-output.json');
const routes = require('./src/routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

const port = process.env.PORT;
const host = `${process.env.VERCEL_URL}:${port}`;

app.listen(port, () => {
    console.log(`🚀 API is running on: ${host} 🚀`);
});