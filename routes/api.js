const IndexController = require('../controllers/index.controller')
const {validate} = require('../middlewares/validators/wrapper.validator')

/**
 *
 * @param app
 * @param validators
 */
module.exports = function (app, validators) {
    app.get('/', IndexController.index)
    app.post('/', validate(validators.indexValidator), IndexController.indexPost)
}