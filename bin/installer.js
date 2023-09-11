#! /usr/bin/env node

"use strict"

const path = require("path")
const figlet = require("figlet")
const inquirer = require("inquirer")
const { checkDirExist } = require("./methods")
const { setup } = require("./setup")
const packageJson = require("../package.json")
const loading = require("loading-cli")
const chalk = require("chalk")

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
        type: "list",
        name: "app_mode",
        message: "Application mode?",
        choices: ["typescript", "javascript"],
        filter(val) {
            return val.toLowerCase()
        }
    },
    {
        type: "list",
        name: "app_orm",
        message: "ORM support?",
        choices: ["sequelize", "mongoose", "none"],
        filter(val) {
            return val.toLowerCase()
        }
    },
    {
        type: "list",
        name: "app_db",
        message: "Database support for?",
        choices: ["mysql", "sqlite", "postgres", "mariadb", "tedious", "oracledb"],
        filter(val) {
            return val.toLowerCase()
        },
        when(answers) {
            return answers.app_orm === "sequelize"
        }
    },
    {
        type: "list",
        name: "app_db",
        message: "Database support for?",
        choices: ["mongodb"],
        filter(val) {
            return val.toLowerCase()
        },
        when(answers) {
            return answers.app_orm === "mongoose"
        }
    },
    {
        type: "confirm",
        name: "docker_support",
        message: "Docker support?",
        default: false
    },
    {
        type: "list",
        name: "app_package_manager",
        message: "Package Manager?",
        choices: ["pnpm", "npm", "yarn", "bun"],
        filter(val) {
            return val.toLowerCase()
        }
    }
]


console.log(
    chalk.green(
        figlet.textSync("Framework X", {
            horizontalLayout: "default",
            verticalLayout: "default"
        })
    )
)

inquirer.prompt(questions).then(async (answers) => {
    const load = loading("Installing awesome Framework, Framework X ...").start()

    answers.clone_command = "git clone -b v" + version + " " + repoUrl + " " + answers.app_name
    answers.app_path = path.join(ownPath, answers.app_name)
    await checkDirExist(answers.app_path)
    await setup(answers)

    load.stop()

    console.log(chalk.blue("Get started..."))
    console.log(chalk.blue(`    cd ${answers.app_name}`))
    console.log(chalk.blue("    npm start"))
    console.log()
    console.log(chalk.green("Check documentation (https://www.frameworkx.info/) for more information"))
})
