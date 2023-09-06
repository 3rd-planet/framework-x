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
const devDependencies = ["jest", "nodemon", "supertest", "husky"]

const tsDevDependencies = ["@types/jest", "@types/supertest", "@types/cors", "@types/express", "ts-jest", "typescript", "ts-node", "ts-node-dev", "@types/node"]

/**
 *
 * @returns {Promise<void>}
 */
const dependenciesInstall = async (app_mode, app_package_manager) => {
    for (const dependency of dependencies) {
        await runCmd(app_package_manager + " install --save " + dependency)
    }

    for (const dependency of devDependencies) {
        await runCmd(app_package_manager + " install --save-dev " + dependency)
    }

    if (app_mode === "typescript") {
        for (const dependency of tsDevDependencies) {
            await runCmd(app_package_manager + " install --save-dev " + dependency)
        }
    }
}


const dbInstall = async (
    app_orm,
    app_db,
    app_package_manager
) => {

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
            return
        }

        if (app_db === "sqlite") {
            await runCmd(app_package_manager + " install --save sqlite3")
            await runCmd("npx sequelize-cli init --force")
            await fs.copyFileSync("./bin/files/sqlite.config.json", "./db.config.json")
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

const updatePackageJson = async (
    app_mode,
    app_orm,
    app_db,
    app_package_manager
) => {
    let fileExtension = app_mode === "typescript" ? "ts" : "js"
    let packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"))
    packageJson.xconfig = {
        mode: app_mode,
        orm: app_orm,
        db: app_db,
        package_manager: app_package_manager
    }

    packageJson.main = "app/server." + fileExtension

    if (fileExtension === "ts") {
        packageJson.jest = {
            "preset": "ts-jest",
            "testEnvironment": "node"
        }

        packageJson.scripts = {
            ...packageJson.scripts,
            "build": "npx tsc"
        }
    }

    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4))
}

exports.setup = async ({ app_path, app_mode, app_orm, app_db, app_package_manager, clone_command, docker_support }) => {
    try {
        await runCmd(clone_command)
        process.chdir(app_path)
        await fs.copyFileSync("./.env.example", ".env")
        await fs.copyFileSync("./bin/files/package.json", "./package.json")

        await updatePackageJson(app_mode, app_orm, app_db, app_package_manager)
        //await dependenciesInstall(app_mode, app_package_manager)

        let sourceDir = app_mode === "typescript" ? "./src.ts" : "./src.js"
        let destinationDir = "./app"

        await fs.cpSync(sourceDir, destinationDir, {
            recursive: true
        })

        if (app_orm !== "none") {
            await dbInstall(app_orm, app_db, app_package_manager)
        }

        let direToRemove = [
            ".git",
            ".github",
            "bin",
            "src.js",
            "src.ts"
        ]

        let filesToRemove = [
            "README.md",
            "CODE_OF_CONDUCT.md",
            "CONTRIBUTING.md",
            "SECURITY.md",
            "LICENSE",
            "app/package.json"
        ]

        if (app_mode !== "typescript") {
            filesToRemove.push("tsconfig.json")
        }

        if (!docker_support) {
            filesToRemove.push(".dockerignore")
            filesToRemove.push("Dockerfile")
        }

        for (const dir of direToRemove) {
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
