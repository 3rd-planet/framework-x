const accessLog = require("simple-node-logger").createSimpleLogger({
    logFilePath: "./log/access/" + new Date().toLocaleDateString().split("/").join("-") + ".log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss"
})

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next) => {
    let reqObject = {
        method: req.method,
        path: req.path,
        param: req.params,
        body: req.body
    }

    let resObject = {
        statusCode: res.statusCode
    }

    accessLog.info(
        JSON.stringify({
            reqObject,
            resObject
        })
    )

    next()
}
