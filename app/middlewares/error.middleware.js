const methods = require("../helpers/methods")
const errorLog = require("simple-node-logger").createSimpleLogger({
    logFilePath: "./log/error/" + new Date().toLocaleDateString().split("/").join("-") + ".log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss"
})

/**
 * This middleware function handles errors in the application.
 * It logs the error message using the errorLog logger and sends a failure response with the error message.
 * The status code for the response is taken from the environment variable EXCEPTION_CODE.
 *
 * @function
 * @module errorMiddleware
 * @param {Object} error - The error object.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Object} The Express response object with the failure response.
 */
module.exports = (error, req, res, next) => {
    errorLog.error(error.message)
    return res.status(process.env.EXCEPTION_CODE).send(methods.failResponse(error.message))
}
