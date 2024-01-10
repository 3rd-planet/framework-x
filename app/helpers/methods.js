const { validationResult } = require("express-validator")

/**
 *
 * @param message
 * @param payload
 * @param statusCode
 * @returns {
 *     {
 *     message: *,
 *     status: boolean,
 *     status_code: number,
 *     package: *
 *     }
 * }
 * @example
 *  const { successResponse } = require("../helpers/methods")
 *  res.status(200).json(successResponse("User created successfully", user, 200))
 */
exports.successResponse = (message, payload, statusCode = 200) => {
    return {
        status: true,
        status_code: statusCode,
        message: message,
        package: payload
    }
}

/**
 *
 * @param message
 * @param payload
 * @param statusCode
 * @returns {
 *     {
 *     message: *,
 *     status: boolean,
 *     status_code: number,
 *     package: *
 *     }
 * }
 * @example
 *  const { failResponse } = require("../helpers/methods")
 *  res.status(400).json(failResponse("Validation failed", errors.array(), 400))
 *
 * */
exports.failResponse = (message, payload = null, statusCode = 400) => {
    let response = {
        status: false,
        status_code: statusCode,
        message: message
    }

    if (payload) {
        response.payload = payload
    }

    return response
}
