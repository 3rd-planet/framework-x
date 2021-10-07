require('dotenv').config()
import errorMiddleware from './middlewares/error.middleware'
import * as validators from './middlewares/validators'

import express from 'express'
import {api} from './routes/api'

const app = express()
const port = process.env.PORT

app.use(express.json())

console.log(`Node environment: ${process.env.NODE_ENV}`)
app.listen(port, () => {
    console.log(`Example app listening at port http://localhost:${port}`)
})

api(app, validators)

// Error Handler Middleware
app.use(errorMiddleware)
