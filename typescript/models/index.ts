import fs from 'fs'
import path from 'path'
import { Sequelize, DataTypes } from 'sequelize'
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/database.json')[env]


const sequelize = new Sequelize(config.database, config.username, config.password, config)


const db: Record<string, any> = {
	sequelize,
	Sequelize
}

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, DataTypes)
		db[model.name] = model
	})

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

export {
	db
}
