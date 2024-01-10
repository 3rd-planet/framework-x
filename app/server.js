const app = require("./index")

/**
 * This function starts the Express application on the port specified in the environment variable PORT.
 * It logs a message indicating the URL at which the application is listening to and the current Node environment.
 *
 * @function
 * @listens {process.env.PORT} The port on which the Express application is started.
 * @example
 *  app.listen(process.env.PORT, () => {
 *      console.log(`Example app listening at port http://localhost:${port}`)
 *      console.log(`Node environment: ${process.env.NODE_ENV}`)
 *  })
 */
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at port http://localhost:${process.env.PORT}`)
    console.log(`Node environment: ${process.env.NODE_ENV}`)
})

/**
 * This line of code applies the error handling middleware to the Express application.
 * The errorMiddleware function is imported from "./middlewares/error.middleware".
 * This middleware function is used to handle any errors that occur in the application.
 * It logs the error message and sends a failure response with the error message.
 *
 */
app.use(require("./middlewares/error.middleware"))
