const {validationResult} = require('express-validator');

const methods = require('../../helpers/methods');

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(process.env.VALIDATION_FAIL_CODE).send(
            methods.failResponse('Validation failed', errors.array())
        );
    }

    next();
}