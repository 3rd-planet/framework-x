const indexValidator = require("./index.validations");

/**
 *
 * @type {{indexValidator?: (ValidationChain|(function(*=, *, *): (*|undefined)))[]}}
 */
module.exports = {
    ...indexValidator
}