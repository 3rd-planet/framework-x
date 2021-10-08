#! /usr/bin/env node

'use strict'

const path = require('path')
const util = require('util')
const fs = require('fs')
const exec = util.promisify(require('child_process').exec)
let typescript = false

if (process.argv.length < 3) {
    console.log('\x1b[31m', 'You have to provide name to your app.')
    console.log('    For example:')
    console.log('    npx create-express-boilerplate my-app', '\x1b[0m')
    process.exit(1)
}

if (process.argv.length === 4 && process.argv.includes("typescript")) {
    typescript = true
}

const ownPath = process.cwd()
const folderName = process.argv[2]
const appPath = path.join(ownPath, folderName)
let repo = typescript ?
    'https://github.com/msamgan/expressjs-api-boilerplate-ts.git' :
    'https://github.com/msamgan/expressjs-api-boilerplate.git'

/**
 *
 * @param command
 * @returns {Promise<void>}
 */
async function runCmd(command) {
    try {
        const {stdout, stderr} = await exec(command)
        console.log('\x1b[33m', 'Executing : ' + command, '\x1b[0m')
        /*console.log(stdout)
        console.log(stderr)*/
    } catch {
        (error) => {
            console.log('\x1b[31m', error, '\x1b[0m')
        }
    }
}

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

        await fs.rmdirSync(path.join(appPath, '.git'), {recursive: true})
        await fs.rmdirSync(path.join(appPath, 'bin'), {recursive: true})
        await fs.rmdirSync(path.join(appPath, 'docs'), {recursive: true})
        await fs.unlink('./mkdocs.yml', () => {
            //
        });

    } catch (error) {
        console.log(error)
    }
}

setup().then(r => {
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
    console.log('\x1b[32m', 'Check Readme.md for more information', '\x1b[0m')
    console.log()
})