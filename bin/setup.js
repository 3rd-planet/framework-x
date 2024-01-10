const { runCmd } = require("./methods")
const fs = require("fs")
const path = require("path")

/**
 *
 * @type {string[]}
 */
const dependencies = ["@3rdplanet/x-core"]

/**
 *
 * @type {string[]}
 */
const devDependencies = ["nodemon", "husky"]

/**
 *
 * @returns {Promise<void>}
 */
const dependenciesInstall = async (app_package_manager) => {
    for (const dependency of dependencies) {
        await runCmd(app_package_manager + " install --save " + dependency)
    }

    for (const dependency of devDependencies) {
        await runCmd(app_package_manager + " install --save-dev " + dependency)
    }
}

/**
 *
 * @param app_orm
 * @param app_db
 * @param app_package_manager
 * @returns {Promise<void>}
 */
const dbInstall = async (app_orm, app_db, app_package_manager) => {
    let appPath = path.join(process.cwd())

    if (app_orm === "mongoose") {
        await runCmd(app_package_manager + " install --save mongoose")

        if (!fs.existsSync(appPath + "/config")) {
            await fs.mkdirSync(appPath + "/config")
        }

        fs.copyFileSync(appPath + "/bin/files/mongodb.connection.js", appPath + "/config/db.connection.js")

        return
    }

    if (app_orm === "sequelize") {
        await runCmd(app_package_manager + " install --save sequelize")

        fs.copyFileSync(appPath + "/bin/files/.sequelizerc", appPath + "/.sequelizerc")

        if (app_db === "mysql") {
            await runCmd(app_package_manager + " install --save mysql2")
            await runCmd("npx sequelize-cli init --force")
            await fs.copyFileSync("./bin/files/mysql.config.js", "./db.config.js")
            await fs.copyFileSync("./bin/files/model.index.js", "./app/models/index.js")

            return
        }

        if (app_db === "sqlite") {
            await runCmd(app_package_manager + " install --save sqlite3")
            await runCmd("npx sequelize-cli init --force")
            await fs.copyFileSync("./bin/files/sqlite.config.js", "./db.config.js")
            await fs.copyFileSync("./bin/files/model.index.js", "./app/models/index.js")

            return
        }

        if (app_db === "postgres") {
            await runCmd(app_package_manager + " install --save pg pg-hstore")

            return
        }

        if (app_db === "mariadb") {
            await runCmd(app_package_manager + " install --save mariadb")

            return
        }

        if (app_db === "tedious") {
            await runCmd(app_package_manager + " install --save tedious")

            return
        }

        if (app_db === "oracledb") {
            await runCmd(app_package_manager + " install --save oracledb")
        }
    }
}

/**
 * This function updates the package.json file of the application.
 * It reads the existing package.json file,
 * adds a new property 'xconfig' with the provided ORM, database, package manager, and an empty modules array.
 * Then it writes the updated JSON back to the package.json file.
 *
 * @async
 * @function updatePackageJson
 * @param {string} app_orm - The ORM to be used by the application.
 * @param {string} app_db - The database to be used by the application.
 * @param {string} app_package_manager - The package manager to be used by the application.
 * @throws {Error} If any error occurs during the reading or writing of the package.json file.
 */
const updatePackageJson = async (app_orm, app_db, app_package_manager) => {
    let packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"))
    packageJson.xconfig = {
        orm: app_orm,
        db: app_db,
        package_manager: app_package_manager,
        modules: []
    }

    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4))
}

/**
 * This function sets up the application by executing a series of commands and operations.
 * It clones the repository,
 * changes the current directory to the application path,
 * copies necessary files,
 * updates the package.json file,
 * installs dependencies,
 * sets up the database (if any),
 * removes unnecessary directories and files,
 * and initializes git and husky.
 *
 * @async
 * @function setup
 * @param {Object} options - The options for setting up the application.
 * @param {string} options.app_path - The path of the application.
 * @param {string} options.app_orm - The ORM to be used by the application.
 * @param {string} options.app_db - The database to be used by the application.
 * @param {string} options.app_package_manager - The package manager to be used by the application.
 * @param {string} options.clone_command - The command to clone the repository.
 * @param {boolean} options.docker_support - Whether the application supports Docker.
 * @throws {Error} If any error occurs during the setup process.
 */
exports.setup = async ({ app_path, app_orm, app_db, app_package_manager, clone_command, docker_support }) => {
    try {
        await runCmd(clone_command)
        process.chdir(app_path)
        await fs.copyFileSync("./.env.example", ".env")
        await fs.copyFileSync("./bin/files/package.json", "./package.json")

        await updatePackageJson(app_orm, app_db, app_package_manager)
        await dependenciesInstall(app_package_manager)

        if (app_orm !== "none") {
            await dbInstall(app_orm, app_db, app_package_manager)
        }

        let dirToRemove = [".git", ".github", "bin"]

        let filesToRemove = ["README.md", "CODE_OF_CONDUCT.md", "CONTRIBUTING.md", "SECURITY.md", "LICENSE"]

        if (!docker_support) {
            filesToRemove.push(".dockerignore")
            filesToRemove.push("Dockerfile")
        }

        for (const dir of dirToRemove) {
            await fs.rmSync(path.join(app_path, dir), {
                recursive: true
            })
        }

        for (const file of filesToRemove) {
            await fs.unlinkSync(path.join(app_path, file))
        }

        /**
         * introducing Husky to the system...
         */
        await runCmd("git init")
        await runCmd("npx husky-init")
        await runCmd(app_package_manager + " install")
    } catch (error) {
        console.log(error)

        process.exit(1)
    }
}
