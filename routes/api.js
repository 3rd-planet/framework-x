const IndexController = require('../controllers/index.controller')

/**
 *
 * @param app
 * @param validators
 */
module.exports = function(app, validators){
    app.get('/', IndexController.index)
    app.post('/', validators.indexValidator, IndexController.indexPost)
}