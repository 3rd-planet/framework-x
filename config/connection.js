const database = require('./database.json')[process.env.NODE_ENV]
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: database.dialect
    });

async function testMysqlConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

//testMysqlConnection().then()

module.exports = {
    sequelize,
    DataTypes
};