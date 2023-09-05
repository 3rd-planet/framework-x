import { Application, NextFunction, Request, Response } from "express"
import { ValidationChain, validationResult } from "express-validator"

/**
 * @interface formattedResponse
 */
interface formattedResponse {
    status: boolean
    status_code: number
    message: String
    package?: object | null
}

/**
 *
 * @param message : string
 * @param payload : object
 * @param statusCode : number
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
export const successResponse = (
    message: String,
    payload: Object,
    statusCode: number = 200
): formattedResponse => {
    return {
        status: true,
        status_code: statusCode,
        message: message,
        package: payload
    }
}

/**
 *
 * @param message : string
 * @param payload : object | null
 * @param statusCode : number
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
export const failResponse = (
    message: String,
    payload: Object | null = null,
    statusCode: number = 400
): formattedResponse => {
    return {
        status: false,
        status_code: statusCode,
        message: message,
        package: payload
    }
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
export const validate = (validations: ValidationChain[]): (() => any) => {
    // @ts-ignore
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req)
            // @ts-ignore
            if (result.errors.length) break
        }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        // @ts-ignore
        res.status(parseInt(process.env.VALIDATION_FAIL_CODE)).json(
            failResponse("Validation failed", errors.array())
        )
    }
}

/**
 * Load all routes from routes folder
 * @param app
 */
export const loadRoutes = (app: Application): void => {
    const routesFiles = require("fs").readdirSync(__dirname + "/../routes")
    routesFiles.forEach(async (file: String) => {
        let routeName = file.split(".")[0]

        /**
         * If route name is api, then remove it from the route name.
         * As api.route.js is the default route file.
         */
        routeName === "api" ? (routeName = "") : (routeName = routeName + "/")

        app.use(`/${routeName}`, (await import(`../routes/${file}`)).default)
    })
}
