const methods = require("../helpers/methods")
const errorLog = require("simple-node-logger").createSimpleLogger({
    logFilePath:
        "./log/error/" +
        new Date().toLocaleDateString().split("/").join("-") +
        ".log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss"
})
/**
 *
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
    errorLog.error(error.message)
    return res
        .status(process.env.EXCEPTION_CODE)
        .send(methods.failResponse(error.message))
}
