const express = require("express")
const router = express.Router()

const { invokeRegister, verifyEmail } = require("../controllers/register.controller")
const { invokeLogin } = require("../controllers/login.controller")
const { invokeUser } = require("../controllers/user.controller")

const { validate } = require("@3rdplanet/x-core/helpers/methods")
const {
    userRegisterValidator,
    verifyEmailValidator
} = require("../middlewares/validators/user.register.validations")

const { userLoginValidator } = require("../middlewares/validators/user.login.validations")

const authMiddleware = require("../middlewares/authentication.middleware")

/**
 * Register user routes here /user is the base route for all user routes
 * @type {string}
 * @example /user/forgot-password
 * @example /user/reset-password/:token/:email
 * @example /user/change-password
 * @example /user/profile
 * @example /user/update-profile
 * @example /user/update-profile-picture
 * @example /user/update-password
 * @example /user/update-email
 * @example /user/logout
 * @example /user/refresh-token
 */

router.post("/register", validate(userRegisterValidator), invokeRegister)
router.get("/verify-email", validate(verifyEmailValidator), verifyEmail)

router.post("/login", validate(userLoginValidator), invokeLogin)

router.get("/", authMiddleware, invokeUser)

module.exports = router
