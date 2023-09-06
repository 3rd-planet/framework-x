const fs = require("fs")
const util = require("util")
const exec = util.promisify(require("child_process").exec)
const chalk = require("chalk")

/**
 *
 * @param command
 * @returns {Promise<void>}
 */
exports.runCmd = async (command) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const { stdout, stderr } = await exec(command)
    } catch (error) {
        console.log(chalk.red(error.message))
    }
}

/**
 *
 * @param appPath
 * @returns {Promise<void>}
 */
exports.checkDirExist = async (appPath) => {
    try {
        fs.mkdirSync(appPath)
    } catch (err) {
        if (err.code.toString() === "EEXIST") {
            console.log(chalk.red(`The directory ${appPath} already exist in the current directory.`))
        } else {
            console.log(err)
        }

        process.exit(1)
    }
}
