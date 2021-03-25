const Sequelize = require("sequelize");

/**
 * Database Connection.
 */
const {sequelize, DataTypes} = require('../config/connection')

const User = require("../models/user")(sequelize, DataTypes);

const models = {
    User,
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

const db = {
    ...models,
    sequelize
};

module.exports = db;