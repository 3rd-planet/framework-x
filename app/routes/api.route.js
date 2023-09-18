const express = require("express")
const router = express.Router()

const IndexController = require("../controllers/index.controller")
const { validate } = require("@3rdplanet/x-core/helpers/methods")
const { indexValidator } = require("../middlewares/validators/index.validations")

router.get("/", IndexController.index)
router.post("/", validate(indexValidator), IndexController.indexPost)

module.exports = router
