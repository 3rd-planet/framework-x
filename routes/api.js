const IndexController = require('../controllers/index.controller')

module.exports = function(app, validators){
    /**
     * static URLS to be on top..
     */
    app.get('/', IndexController.index)
    app.post('/', validators.indexValidator, IndexController.indexPost)
}