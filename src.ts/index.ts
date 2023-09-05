import dotenv from "dotenv"
import express, { Application } from "express"
import cors from "cors"
import { loadRoutes } from "./helpers/methods"

dotenv.config()

const app: Application = express()

app.use(cors())

app.use(express.json())

loadRoutes(app)

export default app