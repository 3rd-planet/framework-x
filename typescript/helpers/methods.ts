interface responseType {
	status: boolean,
	message: string,
	package?: Record<string, any>,
	payload?: Record<string, any>
}


/**
 *
 * @param message
 * @param payload
 * @returns {{package, message, status: boolean}}
 */
const successResponse = (message: string, payload: Record<string, any>): responseType => {
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
const failResponse = (message: string, payload?: Record<string, any>): responseType => {
    let response: responseType = {
        status: false,
        message: message,
    }

    if (payload) {
        response.payload = payload
    }

    return response
}

/**
 *
 * @type {{message: string, status: boolean}}
 */
const notFountResponse: responseType = {
    status: false,
    message: 'Unable to find the requested resource!',
}


export {
	successResponse,
	failResponse,
	notFountResponse
}