require('dotenv').config();
const errorMiddleware = require('./middlewares/error.middleware');

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json());

require('./routes/api')(app);

// Error Handler Middleware
app.use(errorMiddleware);

module.exports = app
