import { NextFunction, Request, Response } from "express"
import { createSimpleLogger } from "simple-node-logger"

const accessLog = createSimpleLogger({
    logFilePath:
        __dirname + "/../../log/access/" + new Date().toLocaleDateString().split("/").join("-") + ".log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss"
})

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export default (req: Request, res: Response, next: NextFunction): any => {
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
