const app = require("@3rdplanet/x-core/app")
const port = process.env.PORT
const errorMiddleware = require("./middlewares/error.middleware")
const accessLogMiddleware = require("./middlewares/logger.middleware")

console.log(`Node environment: ${process.env.NODE_ENV}`)
app.listen(port, () => {
    console.log(`Example app listening at port http://localhost:${port}`)
})

app.use(errorMiddleware)
app.use(accessLogMiddleware)
