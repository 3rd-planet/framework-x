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

const tsDevDependencies = ["@types/jest", "@types/supertest", "@types/cors", "@types/express", "ts-jest", "typescript", "ts-node", "ts-node-dev"]

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
        await dependenciesInstall(app_mode, app_package_manager)

        let sourceDir = app_mode === "typescript" ? "./src.ts" : "./src.js"
        let destinationDir = "./app"

        await fs.cpSync(sourceDir, destinationDir, {
            recursive: true
        })

        /*if (db_support && typeof db_support_options !== "undefined") {
            await dbInstall(db_support_options)
        }*/

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
