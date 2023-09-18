#!/usr/bin/env node

const { Command } = require("commander")
const figlet = require("figlet")
const program = new Command()

console.log(figlet.textSync("X CLI", {
    horizontalLayout: "default",
    verticalLayout: "default"
}))


require("@3rdplanet/x-core/cli").init(program)

program.parse(process.argv)
