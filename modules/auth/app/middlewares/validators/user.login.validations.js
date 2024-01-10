const { body } = require("express-validator")

/**
 *
 * @type {(*)[]}
 */
exports.userLoginValidator = [
    body("email")
        .exists()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be a valid email address"),
    body("password").exists().withMessage("password is required")
]
