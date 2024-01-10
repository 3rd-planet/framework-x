const jwt = require("jsonwebtoken")

/**
 * Authentication middleware, checks if the user is authenticated
 * @param req
 * @param res
 * @param next
 *
 * @throws Error
 * @returns {Promise<void>}
 */
module.exports = (req, res, next) => {
    const bearerHeader = req.headers["authorization"]

    if (!bearerHeader) throw new Error("Unauthorized")

    const accessToken = bearerHeader.split(" ")[1]

    if (!accessToken) throw new Error("Unauthorized")

    const userJwt = jwt.verify(accessToken, process.env.JWT_SECRET)

    if (!userJwt) throw new Error("Unauthorized")

    req.user = userJwt.data

    next()
}
