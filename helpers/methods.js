exports.successResponse = (message, payload) => {
    return {
        status: true,
        message: message,
        package: payload
    }
}

exports.failResponse = (message) => {
    return {
        status: true,
        message: message,
    }
}
exports.notFountResponse = {
    status: false,
    message: 'Unable to find the requested resource!',
}