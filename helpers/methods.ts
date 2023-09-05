import { Application, Router } from "express"

/**
 * Load all routes from routes folder
 * @param app
 */
export const loadRoutes = (app: Application): void => {
    const routesFiles = require("fs").readdirSync("./routes")
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