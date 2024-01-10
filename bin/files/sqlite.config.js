const dotenv = require("dotenv").config().parsed

let config = {
    dialect: dotenv.DB_DIALECT,
    storage: "./" + dotenv.DB_NAME + ".sqlite3"
}

module.exports = {
    development: config,
    test: config,
    production: config
}
