const { body } = require("express-validator")

/**
 * @type {ValidationChain[]}
 * @example
 *  const { indexValidator } = require("../middlewares/validators/index.validations")
 *  router.post("/", validate(indexValidator), IndexController.indexPost)
 *
 */
exports.indexValidator = [body("key").exists().withMessage("key is required")]
