import { body, ValidationChain } from "express-validator"

/**
 * @type {ValidationChain[]}
 * @example
 *  const { indexValidator } = require("../middlewares/validators/index.validations")
 *  router.post("/", validate(indexValidator), IndexController.indexPost)
 *
 */
export const indexValidator: ValidationChain[] = [body("key").exists().withMessage("key is required")]
