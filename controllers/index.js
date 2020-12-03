const methods = require('../helpers/methods')
const ModelName = require('../models/model');

exports.index = async (req, res) => {
    res.send(methods.successResponse(
        'Express JS API Boiler Plate working like a charm...',
        {
            data: 'here comes you payload...'
        }
    ))
}