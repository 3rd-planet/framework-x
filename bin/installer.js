#! /usr/bin/env node

'use strict'

const path = require('path')
const util = require('util')
const fs = require('fs')
const exec = util.promisify(require('child_process').exec)
let typescript = false;
/**
 *
 * @param command
 * @returns {Promise<void>}
 */
async function runCmd(command) {
    try {
        const {stdout, stderr} = await exec(command)
        console.log(stdout)
        console.log(stderr)
    } catch {
        (error) => {
            console.log('\x1b[31m', error, '\x1b[0m')
        }
    }
}

if (process.argv.length < 3) {
    console.log('\x1b[31m', 'You have to provide name to your app.')
    console.log('For example:')
    console.log('    npx create-express-boilerplate my-app', '\x1b[0m')
    process.exit(1)
}

if (process.argv.length === 4 && process.argv.includes("typescript")) {
	typescript = true;
}

const ownPath = process.cwd()
const folderName = process.argv[2]
const appPath = path.join(ownPath, folderName)
const repo = 'https://github.com/msamgan/expressjs-api-boilerplate.git'

try {
    fs.mkdirSync(appPath)
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(
            '\x1b[31m',
            `The file ${appName} already exist in the current directory, please give it another name.`,
            '\x1b[0m'
        )
    } else {
        console.log(err)
    }
    process.exit(1)
}

/**
 *
 * @returns {Promise<void>}
 */
async function setup() {
    try {
        console.log('\x1b[33m', 'Downloading the project structure...', '\x1b[0m')
        await runCmd(`git clone --depth 1 ${repo} ${folderName}`)

		if (typescript) {
			fs.rmdirSync(path.join(appPath, 'helpers'))
			fs.rmdirSync(path.join(appPath, 'middlewares'))
			fs.rmdirSync(path.join(appPath, 'models'))
			fs.rmdirSync(path.join(appPath, 'controllers'))
			fs.rmdirSync(path.join(appPath, 'routes'))
			fs.rmSync(path.join(appPath, 'index.js'))
			fs.rmSync(path.join(appPath, 'package.json'))
			fs.rmSync(path.join(appPath, 'package-lock.json'))
			fs.cp(path.join(appPath, 'typescript'), appPath)
			fs.rmdirSync(path.join(appPath, 'typescript'), appPath)
		}

        process.chdir(appPath)

        console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m')
		
        await runCmd('npm install')
        console.log()

        await runCmd('npx rimraf ./.git')

        fs.rmdirSync(path.join(appPath, 'bin'), {recursive: true})

        console.log(
            '\x1b[32m',
            'The installation is done, this is ready to use !',
            '\x1b[0m'
        )

        console.log()

        console.log('\x1b[34m', 'You can start by typing:')
        console.log(`    cd ${folderName}`)
        console.log('    npm start', '\x1b[0m')
        console.log()
        console.log('Check Readme.md for more information')
        console.log()
    } catch (error) {
        console.log(error)
    }
}

setup()