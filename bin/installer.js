#! /usr/bin/env node

'use strict'

const path = require('path')

let typescript = false
const prompt = require("prompt-sync")();

const {checkDirExist} = require('./methods')
const {setup} = require('./setup')

const ownPath = process.cwd()

const appName = prompt("You have to provide name to your app. (my-api)? ");
let folderName = appName.length ? appName : 'my-api'
const appPath = path.join(ownPath, folderName)

const tsSupport = prompt("Enable typescript support y or n, (default n)? ");
typescript = !!(tsSupport.length && (tsSupport.toLowerCase() === 'y' || tsSupport.toLowerCase() === 'yes'))

let sequelizeSupport = prompt("Enable sequelize support y or n, (default n)? ");
sequelizeSupport = !!(sequelizeSupport.length && (sequelizeSupport.toLowerCase() === 'y' || sequelizeSupport.toLowerCase() === 'yes'))

let repo = typescript ?
    'https://github.com/hudaQeshta/expressjs-api-boilerplate-ts.git' :
    'https://github.com/msamgan/expressjs-api-boilerplate.git'


/**
 *
 * @returns {Promise<void>}
 */
async function init() {
    await checkDirExist(appPath)
    await setup(repo, folderName, appPath, sequelizeSupport)
}

init().then(r => {
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