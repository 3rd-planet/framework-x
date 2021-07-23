const IndexController = require('../controllers/index.controller')

module.exports = function(app){
    /**
     * static URLS to be on top..
     */
    app.get('/', IndexController.index)
    app.post('/', IndexController.indexPost)
}