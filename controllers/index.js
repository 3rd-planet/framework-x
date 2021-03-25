const methods = require('../helpers/methods')
const {User} = require('../models')

exports.index = async (req, res) => {
    res.send(methods.successResponse(
        'Express JS API Boiler Plate working like a charm...',
        {
            data: 'here comes you payload...'
        }
    ))
}

exports.indexPost = async (req, res) => {
    res.send(methods.successResponse(
        'Express JS API Boiler Plate post api working like a charm...',
        {
            data: 'here comes you payload...',
            request: req.body,
        }
    ))
}