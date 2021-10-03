const methods = require('../helpers/methods');

module.exports = (error, req, res, next) => {
    return res.status(process.env.EXCEPTION_CODE).send(methods.failResponse(error.message));
}
