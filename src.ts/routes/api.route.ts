import { Router } from "express"
import { index, indexPost } from "../controllers/index.controller"
import { indexValidator } from "../middlewares/validators/index.validations"
import { validate } from "../helpers/methods"

const router: Router = Router()

router.get("/", index)
router.post("/", validate(indexValidator), indexPost)

export default router
