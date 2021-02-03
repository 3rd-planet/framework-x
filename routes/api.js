const Index = require('../controllers/index')

module.exports = function(app){
    /**
     * static URLS to be on top..
     */
    app.get('/', Index.index)
    app.post('/', Index.indexPost)
}