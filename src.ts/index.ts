import dotenv from "dotenv"
import "express-async-errors"
import express, { Application } from "express"
import cors from "cors"
import { loadRoutes } from "./helpers/methods"

import accessLogMiddleware from "./middlewares/logger.middleware"

dotenv.config()

const app: Application = express()

app.use(cors())

app.use(express.json())

app.use(accessLogMiddleware)

loadRoutes(app)

export default app