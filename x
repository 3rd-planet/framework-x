#!/usr/bin/env node

const { Command } = require("commander")
const chalk = require("chalk")
const figlet = require("figlet")
const program = new Command()
require("@3rdplanet/x-core").init(program)

console.log(
    chalk.green(
        figlet.textSync("Framework X", {
            horizontalLayout: "default",
            verticalLayout: "default"
        })
    )
)

program.parse(process.argv)
