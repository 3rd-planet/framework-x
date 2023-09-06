const { successResponse } = require("../helpers/methods")

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async (req, res) => {
    return res.send(
        successResponse("framework-x is working like a charm...", {
            data: "here comes you payload..."
        })
    )
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.indexPost = async (req, res) => {
    return res.send(
        successResponse("framework-x post api is working like a charm...", {
            data: "here comes you payload...",
            request: req.body
        })
    )
}
