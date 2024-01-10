const { successResponse } = require("../../../../app/helpers/methods")
const { getUserByEmail } = require("../repositories/user.repository")
const { isCacheEnabled, setCache, getCache } = require("@3rdplanet/x-core/cache")

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.invokeUser = async (req, res) => {
    // Check if the user is in cache
    let userFromCache = await getCache(req.url)

    // If the user is in cache, return the user from cache
    if (userFromCache) return res.send(successResponse("User details", userFromCache.response))

    // If the user is not in cache, get the user from the database
    let user = await getUserByEmail(req.user.email)

    // if cache is not enabled, return the user from the database
    if (!isCacheEnabled()) return res.send(successResponse("User details", user))

    // if cache is enabled, set the user in cache
    setCache(req.url, user, {
        function: getUserByEmail, // The function to call to update the cache
        params: [req.user.email] // The parameters to pass to the function
    }).then(() => {})

    return res.send(successResponse("User details", user))
}
