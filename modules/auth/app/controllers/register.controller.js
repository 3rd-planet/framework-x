const { successResponse } = require("../../../../app/helpers/methods")
const { storeUser, verifyEmail } = require("../repositories/user.repository")

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.invokeRegister = async (req, res) => {
    let { first_name, last_name, email, password } = req.body

    let user = await storeUser({
        first_name,
        last_name,
        email,
        password
    })

    return res.send(successResponse("User created successfully.", user))
}

/**
 * Verify email
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.verifyEmail = async (req, res) => {
    let { token, email } = req.query

    await verifyEmail(token, email)

    return res.send(successResponse("Email verified successfully.", {}))
}
