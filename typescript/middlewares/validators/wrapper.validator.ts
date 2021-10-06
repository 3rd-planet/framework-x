import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import * as methods from '../../helpers/methods'

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const wrapperValidator = (req: Request, res: Response, next: NextFunction): any => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(Number(process.env.VALIDATION_FAIL_CODE)).send(
            methods.failResponse('Validation failed', errors.array())
        )
    }

    next()
}