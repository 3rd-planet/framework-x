import express, { Request, Response, Application, Router } from "express"

const router: Router = Router()

router.get("/", (req: Request, res: Response) => {
        return res.send("Welcome to Express & TypeScript Server")
    }
)

export default router