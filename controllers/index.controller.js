const { successResponse } = require("../helpers/methods")

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async (req, res) => {
    res.send(
        successResponse("Express JS API Boiler Plate working like a charm...", {
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
    res.send(
        successResponse("Express JS API Boiler Plate post api working like a charm...", {
            data: "here comes you payload...",
            request: req.body
        })
    )
}
