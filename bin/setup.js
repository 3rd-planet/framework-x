const { runCmd } = require("./methods")
const fs = require("fs")
const path = require("path")

exports.setup = async (answers) => {
    try {
        console.log(
            "\x1b[33m",
            "Downloading the project structure...",
            "\x1b[0m"
        )
        await runCmd(`git clone --depth 1 ${answers.repo} ${answers.app_name}`)

        process.chdir(answers.app_path)

        console.log("\x1b[32m", "Creating Environment... !", "\x1b[0m")
        await fs.copyFileSync("./.env.example", ".env")

        console.log("\x1b[34m", "Installing dependencies...", "\x1b[0m")

        await runCmd("npm install --silent")

        if (answers.db_support) {
            if (typeof answers.db_support_options !== "undefined") {
                if (["mysql", "sqlite"].includes(answers.db_support_options)) {
                    await runCmd("npm install --save sequelize")
                    await runCmd("npx sequelize-cli init --force")

                    if (answers.db_support_options === "mysql") {
                        await runCmd("npm install --save mysql2")
                    }

                    if (answers.db_support_options === "sqlite") {
                        await runCmd("npm install --save sqlite3")
                        await fs.copyFileSync(
                            "./bin/files/sqlite.config.json",
                            "./config/config.json"
                        )
                    }
                } else {
                    if (answers.db_support_options === "mongodb") {
                        await runCmd("npm install --save mongoose")
                        await fs.copyFileSync(
                            "./bin/files/mongodb.connection.js",
                            "./config/db.connection.js"
                        )
                    }
                }
            }
        }

        console.log("\x1b[34m", "Removing unwanted files...", "\x1b[0m")

        await fs.rmdirSync(path.join(answers.app_path, ".git"), {
            recursive: true
        })
        await fs.rmdirSync(path.join(answers.app_path, "bin"), {
            recursive: true
        })
        await fs.rmdirSync(path.join(answers.app_path, "docs"), {
            recursive: true
        })

        /**
         * introducing Husky to the system...
         */
        await runCmd("git init")
        await runCmd("npx husky-init")
        await runCmd("npm install")

        await fs.unlinkSync("LICENSE")
        await fs.unlinkSync("README.md")
        await fs.unlinkSync("./mkdocs.yml")
    } catch (error) {
        console.log(error)

        process.exit(1)
    }
}
