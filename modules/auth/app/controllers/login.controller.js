const { successResponse } = require("../../../../app/helpers/methods")
const { login } = require("../repositories/user.repository")

/**
 * Login user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.invokeLogin = async (req, res) => {
    const { email, password } = req.body
    return res.send(successResponse("Authenticated", await login(email, password)))
}
