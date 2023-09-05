import dotenv from "dotenv"
import express, { Express, Request, Response, Application } from "express"

//For env File
dotenv.config()

const app: Application = express()

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server")
})


export default app