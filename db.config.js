const dotenv = require("dotenv").config().parsed

let config = {
    username: dotenv.DB_USERNAME,
    password: dotenv.DB_PASSWORD,
    database: dotenv.DB_NAME,
    host: dotenv.DB_HOST,
    port: dotenv.DB_PORT,
    dialect: dotenv.DB_DIALECT,
    migrationStorageTableName: "sequelize_migrations",
    seederStorageTableName: "sequelize_seeds"
}

module.exports = {
    development: config,
    test: config,
    production: config
}
