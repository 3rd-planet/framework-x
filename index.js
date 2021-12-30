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

console.log(`Node environment: ${process.env.NODE_ENV}`);
app.listen(port, () => {
    console.log(`Example app listening at port http://localhost:${port}`)
})

require('./routes/api')(app);

// Error Handler Middleware
app.use(errorMiddleware);

module.exports = app
