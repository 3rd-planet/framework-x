#! /usr/bin/env node

"use strict"

const path = require("path")

const inquirer = require("inquirer")
const { checkDirExist } = require("./methods")
const { setup } = require("./setup")
const packageJson = require("../package.json")

const loading = require("loading-cli")

const ownPath = process.cwd()

const repoUrl = "https://github.com/3rd-planet/framework-x.git"
const version = packageJson.version

const questions = [
    {
        type: "input",
        name: "app_name",
        message: "You have to provide name to your app",
        default() {
            return "x-api"
        }
    },
    {
        type: "confirm",
        name: "db_support",
        message: "Enable Database Support",
        default() {
            return false
        }
    },
    {
        type: "list",
        name: "db_support_options",
        message: "Database support for?",
        choices: ["mongodb", "mysql", "sqlite"],
        filter(val) {
            return val.toLowerCase()
        },
        when(answers) {
            return answers.db_support
        }
    }
]

inquirer.prompt(questions).then(async (answers) => {
    const load = loading("Installing awesome framework, framework-x ...").start()

    answers.clone_command = "git clone -b v" + version + " " + repoUrl + " " + answers.app_name
    answers.app_path = path.join(ownPath, answers.app_name)
    await checkDirExist(answers.app_path)
    await setup(answers)

    load.stop()

    console.log("\x1b[34m", "Get started...")
    console.log(`    cd ${answers.app_name}`)
    console.log("    npm start", "\x1b[0m")
    console.log()
    console.log(
        "\x1b[32m",
        "Check documentation (https://3rd-planet.github.io/framework-x/) for more information",
        "\x1b[0m"
    )
})
