#!/usr/bin/env node

const { Command } = require("commander")
const figlet = require("figlet")
const program = new Command()
require("@3rdplanet/x-core").init(program, __dirname)

console.log(figlet.textSync("X CLI", {
    horizontalLayout: "default",
    verticalLayout: "default"
}))

program.parse(process.argv)
