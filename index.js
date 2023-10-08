const express = require('express');
const routes = require('./src/routes');

const app = express();

app.use(express.json());
app.use('/api', routes);

const port = 3001;

app.listen(port, () => {
    console.log("🚀 API is running: http://localhost:3001/ 🚀");
});