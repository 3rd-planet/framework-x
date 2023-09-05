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

/**
 * sequential processing, stops running validations chain if the previous one have failed.
 * @param validations
 * @returns {function(*=, *=, *): Promise<*>}
 * @example
 *  const { validate } = require("../helpers/methods")
 *  const { indexValidator } = require("../middlewares/validators/index.validations")
 *  router.post("/", validate(indexValidator), IndexController.indexPost)
 */
exports.validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req)
            if (result.errors.length) break
        }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        res.status(parseInt(process.env.VALIDATION_FAIL_CODE)).json(
            this.failResponse("Validation failed", errors.array())
        )
    }
}

/**
 * load all routes from routes folder
 * @param app
 */
exports.loadRoutes = (app) => {
    const routesFiles = require("fs").readdirSync("./routes")
    routesFiles.forEach((file) => {
            const route = require(`../routes/${file}`)
            let routeName = file.split(".")[0]

            /**
             * If route name is api, then remove it from the route name.
             * As api.route.js is the default route file.
             */
            routeName === "api" ? routeName = "" : routeName = routeName + "/"

            app.use(`/${routeName}`, route)
        }
    )
}
