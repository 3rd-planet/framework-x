require('dotenv').config();
const errorMiddleware = require('./middlewares/error.middleware');

const express = require('express')
const app = express()

app.use(express.json());

require('./routes/api')(app);

// Error Handler Middleware
app.use(errorMiddleware);

module.exports = app
