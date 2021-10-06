import { body, param } from 'express-validator'
import * as wrapperValidator from "./wrapper.validator"

/**
 *
 * @type {(ValidationChain|(function(*=, *, *): (*|undefined)))[]}
 */
export const indexValidator: Record<string, any> = [
    body('key')
        .exists()
        .withMessage('key is required'),
    wrapperValidator
]