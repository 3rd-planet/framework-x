import dotenv from "dotenv"
import "express-async-errors"
import express, { Application } from "express"
import cors from "cors"
import { loadRoutes } from "./helpers/methods"

import accessLogMiddleware from "./middlewares/logger.middleware"

dotenv.config()

/**
 * @type {Application}
 */
const app: Application = express()

/**
 * Enable cors for all routes and origins. You can change this to only allow specific origins.
 * See cors documentation for more info.
 * @see https://www.npmjs.com/package/cors
 */
app.use(cors())

/**
 * Enable json body parsing for all routes. You can change this to only allow specific origins.
 * See express documentation for more info.
 * @see https://expressjs.com/en/api.html#express.json
 */
app.use(express.json())

/**
 * enabling logging for all routes in console.
 */
app.use(accessLogMiddleware)

/**
 * Load all routes from routes folder.
 */
loadRoutes(app)

export default app