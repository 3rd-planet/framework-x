const {body, param} = require('express-validator');
const wrapperValidator = require("./wrapper.validator");

exports.indexValidator = [
    body('key')
        .exists()
        .withMessage('key is required'),
    wrapperValidator
];