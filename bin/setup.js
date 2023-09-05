const { runCmd } = require("./methods")
const fs = require("fs")
const path = require("path")

/**
 *
 * @type {string[]}
 */
const dependencies = [
    "commander",
    "cors",
    "dotenv",
    "express",
    "express-async-errors",
    "express-validator",
    "simple-node-logger",
    "loading-cli",
    "@3rdplanet/x-core"
]

/**
 *
 * @type {string[]}
 */
const devDependencies = [
    "jest",
    "nodemon",
    "supertest",
    "husky"
]

/**
 *
 * @returns {Promise<void>}
 */
const dependenciesInstall = async () => {
    for (const dependency of dependencies) {
        await runCmd("npm install --save " + dependency)
    }

    for (const dependency of devDependencies) {
        await runCmd("npm install --save-dev " + dependency)
    }
}

/**
 *
 * @param db_support_options
 * @returns {Promise<void>}
 */
const dbInstall = async (db_support_options) => {
    await runCmd("npm install --save sequelize")
    await runCmd("npx sequelize-cli init --force")

    if (["mysql", "sqlite"].includes(db_support_options)) {
        if (db_support_options === "mysql") {
            await runCmd("npm install --save mysql2")
        }

        if (db_support_options === "sqlite") {
            await runCmd("npm install --save sqlite3")
            await fs.copyFileSync("./bin/files/sqlite.config.json", "./config/config.json")
        }

        return
    }

    if (db_support_options === "mongodb") {
        await runCmd("npm install --save mongoose")
        await fs.copyFileSync("./bin/files/mongodb.connection.js", "./config/db.connection.js")
    }
}

exports.setup = async ({ app_path, db_support, db_support_options, clone_command }) => {
    try {
        await runCmd(clone_command)
        process.chdir(app_path)
        await fs.copyFileSync("./.env.example", ".env")
        await fs.copyFileSync("./bin/files/package.json", "./package.json")

        await dependenciesInstall()

        if (db_support && typeof db_support_options !== "undefined") {
            await dbInstall(db_support_options)
        }

        await fs.rmSync(path.join(app_path, ".git"), {
            recursive: true
        })
        await fs.rmSync(path.join(app_path, "bin"), {
            recursive: true
        })

        /**
         * introducing Husky to the system...
         */
        await runCmd("git init")
        await runCmd("npx husky-init")
        await runCmd("npm install")

        await fs.unlinkSync("README.md")
        await fs.unlinkSync("./CODE_OF_CONDUCT.md")
        await fs.unlinkSync("./CONTRIBUTING.md")
        await fs.unlinkSync("./SECURITY.md")
        await fs.unlinkSync("LICENSE")

    } catch (error) {
        console.log(error)

        process.exit(1)
    }
}
