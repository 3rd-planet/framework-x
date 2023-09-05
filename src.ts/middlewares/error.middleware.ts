import { failResponse } from "../helpers/methods"
import { createSimpleLogger } from "simple-node-logger"
import type { ErrorRequestHandler, NextFunction, Request, Response } from "express"

const errorLog = createSimpleLogger({
    logFilePath: __dirname + "/../../log/error/" + new Date().toLocaleDateString().split("/").join("-") + ".log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss"
})

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    errorLog.error(err.message)
    // @ts-ignore
    return res.status(process.env.EXCEPTION_CODE).send(failResponse(err.message))
}

export default errorHandler
