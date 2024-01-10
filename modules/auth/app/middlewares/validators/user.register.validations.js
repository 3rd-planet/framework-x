const { body, query } = require("express-validator")

/**
 *
 * @type {(*)[]}
 */
exports.userRegisterValidator = [
    body("first_name")
        .exists()
        .withMessage("first name is required")
        .isLength({ min: 2 })
        .withMessage("first name must be at least 3 characters long")
        .isLength({ max: 255 })
        .withMessage("first name must be at most 255 characters long"),
    body("last_name")
        .exists()
        .withMessage("last name is required")
        .isLength({ min: 2 })
        .withMessage("last name must be at least 3 characters long")
        .isLength({ max: 255 })
        .withMessage("last name must be at most 255 characters long"),
    body("email")
        .exists()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be a valid email address")
        .isLength({ max: 255 })
        .withMessage("email must be at most 255 characters long"),
    body("password")
        .exists()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters long")
        .isLength({ max: 255 })
        .withMessage("password must be at most 255 characters long")
]

/**
 *
 * @type {(*)[]}
 */
exports.verifyEmailValidator = [
    query("token").exists().withMessage("token is required"),
    query("email")
        .exists()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be a valid email address")
]
