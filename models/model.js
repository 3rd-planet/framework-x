const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class ModelName extends Model {
}

ModelName.init({}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'model_name', // We need to choose the model name
    tableName: 'table_name',
    /*underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',*/
});

exports.model_name = ModelName