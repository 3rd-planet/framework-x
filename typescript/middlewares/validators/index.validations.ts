import {body, ValidationChain} from 'express-validator'

export const indexValidator : ValidationChain[] = [
    body('key')
        .exists()
        .withMessage('key is required')
]