const {response} = require("express");
exports.successResponse = (message, payload) => {
    return {
        status: true,
        message: message,
        package: payload
    }
}

/**
 *
 * @param message
 * @param payload
 * @returns {{message, status: boolean}}
 */
exports.failResponse = (message, payload = null) => {
    let response = {
        status: false,
        message: message,
    }

    if (payload) {
        response.payload = payload
    }

    return response
}

exports.notFountResponse = {
    status: false,
    message: 'Unable to find the requested resource!',
}