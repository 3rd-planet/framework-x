require("dotenv").config()
require("express-async-errors")
const { loadRoutes } = require("@3rdplanet/x-core/helpers/methods")

const accessLogMiddleware = require("./middlewares/logger.middleware")

const express = require("express")

/**
 * Create an express app.
 * @type {Express}
 */
const app = express()

/**
 * Enable cors for all routes and origins. You can change this to only allow specific origins.
 * @type {(function(*): function(*, *, *): void)|{}}
 */
const cors = require("cors")

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
 * enabling logging for all routes in the console.
 */
app.use(accessLogMiddleware)

/**
 * Load all routes from the routes folder and modules.
 */
loadRoutes(app)

/**
 * Export the express app.
 * @type {Express}
 */
module.exports = app
