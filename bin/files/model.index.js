const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const process = require("process")
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || "development"
const config = require("../../db.config")[env]
let activeModules = require("@3rdplanet/x-core/helpers/methods").activeModules()

const db = {}

let sequelize = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable], config)
    : new Sequelize(config.database, config.username, config.password, config)

let modelsFiles = fs.readdirSync(__dirname)

for (let i = 0; i < activeModules.length; i++) {
    let module = activeModules[i]
    let moduleModelsDir = path.join("../../", "modules", module, "app", "models")

    if (fs.existsSync(moduleModelsDir)) {
        let moduleModelsFiles = fs.readdirSync(moduleModelsDir)

        modelsFiles = modelsFiles.concat(moduleModelsFiles)
    }
}

modelsFiles
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" &&
            file.indexOf(".test.js") === -1
        )
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
