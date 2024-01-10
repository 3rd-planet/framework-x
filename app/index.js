require("dotenv").config()
require("express-async-errors")

const { loadRoutes } = require("@3rdplanet/x-core/helpers/methods")

const express = require("express")

const app = express()

/**
 * This line of code applies the CORS middleware to the Express application.
 * The cors module is imported using the require function and immediately invoked.
 * This middleware is used to enable Cross-Origin Resource Sharing (CORS) with various options.
 *
 * @link https://expressjs.com/en/resources/middleware/cors.html
 */
app.use(require("cors")())

/**
 * This line of code applies the express.json middleware to the Express application.
 * express.json is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
 * This middleware is used to read HTTP POST data. It's part of Express 4.x,
 * which has built-in middleware for parsing json and urlencoded form data.
 *
 * @link http://expressjs.com/en/api.html#express.json
 */
app.use(express.json())

/**
 * enabling logging for all routes in the console.
 */
app.use(require("./middlewares/logger.middleware"))

/**
 * Load all routes from the routes folder and modules.
 */
loadRoutes(app)

/**
 * This line of code exports the Express application object.
 * This object is used to set up the server, define routes, and listen for requests.
 * It can be imported in other modules to use the configured Express application.
 *
 * @module app
 * @type {import('express').Express}
 */
module.exports = app
