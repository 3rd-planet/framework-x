const IndexController = require('../controllers/index.controller')
const {validate} = require('../middlewares/validators/wrapper.validator')
const {indexValidator} = require("../middlewares/validators/index.validations");
//const accessLogMiddleware = require('../middlewares/logger.middleware');

/**
 *
 * @param app
 */
module.exports = function (app) {
    app.get('/',IndexController.index)
    app.post('/', validate(indexValidator), IndexController.indexPost)
}