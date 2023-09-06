import { successResponse } from "../helpers/methods"
import { Request, Response } from "express"

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const index = async (req: Request, res: Response): Promise<Response> => {
    return res.send(
        successResponse("framework-x is working like a charm...", {
            data: "here comes you payload..."
        })
    )
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const indexPost = async (req: Request, res: Response): Promise<Response> => {
    return res.send(
        successResponse("framework-x post api is working like a charm...", {
            data: "here comes you payload...",
            request: req.body
        })
    )
}
