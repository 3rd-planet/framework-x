/**
 * This function generates a success response object.
 * It takes a message, payload, and status code as parameters and returns an object with a status of true,
 * the provided status code, message, and payload.
 *
 * @function successResponse
 * @param {string} message - The success message to be included in the response.
 * @param {*} payload - The data to be included in the response.
 * @param {number} [statusCode=200] - The HTTP status code for the response, Defaults to 200.
 * @returns {Object} The success response object, it includes the status (true), status code, message, and payload.
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
 * This function generates a failure response object.
 * It takes a message, payload, and status code as parameters and returns an object with a status of false,
 * the provided status code, message, and payload (if provided).
 *
 * @function failResponse
 * @param {string} message - The failure message to be included in the response.
 * @param {*} [payload=null] - The data to be included in the response. Defaults to null.
 * @param {number} [statusCode=400] - The HTTP status code for the response. Defaults to 400.
 * @returns {Object} The failure response object. It includes the status (false), status code, message, and payload (if provided).
 * @example
 *  const { failResponse } = require("../helpers/methods")
 *  res.status(400).json(failResponse("User creation failed", error, 400))
 */
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
