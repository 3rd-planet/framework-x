require('dotenv').config();
const errorMiddleware = require('./middlewares/error.middleware');

const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.json());

console.log(`Node environment: ${process.env.NODE_ENV}`);
app.listen(port, () => {
    console.log(`Example app listening at port http://localhost:${port}`)
})

require('./routes/api')(app);

// Error Handler Middleware
app.use(errorMiddleware);
