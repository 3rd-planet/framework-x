require('dotenv').config();
const errorMiddleware = require('./middlewares/error.middleware');
const accessLogMiddleware = require('./middlewares/logger.middleware');

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT

app.use(cors())

app.use(express.json());

// Req and Res logger.
app.use(accessLogMiddleware);

require('./routes/api')(app);

// Error Handler Middleware
app.use(errorMiddleware);

module.exports = app
