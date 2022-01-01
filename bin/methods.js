const fs = require("fs")
const util = require("util")
const exec = util.promisify(require("child_process").exec)

/**
 *
 * @param command
 * @returns {Promise<void>}
 */
exports.runCmd = async (command) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const { stdout, stderr } = await exec(command)
        console.log("\x1b[33m", "Executing : " + command, "\x1b[0m")
    } catch (error) {
        console.log("\x1b[31m", error.message, "\x1b[0m")
    }
}

/**
 *
 * @param appPath
 * @param folderName
 * @returns {Promise<void>}
 */
exports.checkDirExist = async (appPath, folderName) => {
    try {
        fs.mkdirSync(appPath)
    } catch (err) {
        if (err.code.toString() === "EEXIST") {
            console.log(
                "\x1b[31m",
                `The file ${folderName} already exist in the current directory, please give it another name.`,
                "\x1b[0m"
            )
        } else {
            console.log(err)
        }

        process.exit(1)
    }
}
