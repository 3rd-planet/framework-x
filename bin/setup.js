const {runCmd} = require("./methods");
const fs = require("fs");
const path = require("path");

/**
 *
 * @param repo
 * @param folderName
 * @param appPath
 * @returns {Promise<void>}
 */
exports.setup = async (repo, folderName, appPath) => {
    try {

        console.log('\x1b[33m', 'Downloading the project structure...', '\x1b[0m')
        await runCmd(`git clone --depth 1 ${repo} ${folderName}`)

        process.chdir(appPath)

        await fs.copyFile('./.env.example', '.env', () => {
            console.log(
                '\x1b[32m',
                'Creating Environment... !',
                '\x1b[0m'
            );
        })

        console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m')

        await runCmd('npm install --silent')
        await runCmd('npx sequelize-cli init --force')

        await fs.rmdirSync(path.join(appPath, '.git'), {recursive: true})
        await fs.rmdirSync(path.join(appPath, 'bin'), {recursive: true})
        await fs.rmdirSync(path.join(appPath, 'docs'), {recursive: true})
        await fs.unlink('./mkdocs.yml', () => {
            //
        });

    } catch (error) {
        console.log(error)

        process.exit(1)
    }
}