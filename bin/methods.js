const fs = require("fs")
const util = require("util")
const exec = util.promisify(require("child_process").exec)
const chalk = require("chalk")

/**
 * This function executes a given command using the child_process module's exec function.
 * It logs the error message in red color if any error occurs during the execution of the command.
 *
 * @async
 * @function runCmd
 * @param {string} command - The command to be executed.
 * @throws {Error} If any error occurs during the execution of the command.
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
 * This function checks if a directory exists at the given path.
 * If the directory does not exist, it creates one.
 * If the directory already exists, it logs an error message and terminates the process.
 * If any other error occurs during the creation of the directory, it logs the error and terminates the process.
 *
 * @async
 * @function checkDirExist
 * @param {string} appPath - The path where the directory is to be created.
 * @throws {Error} If the directory already exists or any other error occurs during the creation of the directory.
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
