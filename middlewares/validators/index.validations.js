const {body, param, ValidationChain} = require('express-validator');

/**
 *
 * @type {ValidationChain[]}
 */
exports.indexValidator = [
    body('key')
        .exists()
        .withMessage('key is required'),
];