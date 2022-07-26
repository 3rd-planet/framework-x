const moongose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await moongose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log(`DB connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error: ${err.message}`)
        //Exit with failure.
        process.exit(1)
    }
}

module.exports = { connectDB }
