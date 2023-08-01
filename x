#!/usr/bin/env node

const { Command } = require("commander")
const { init } = require("./system/cli")
const program = new Command()
const packageJson = require("./package.json")

program.name("x").description("CLI Commands for Express Boilerplate").version(packageJson.version)

init(program)

/**
 * * add your commands here
 * * use commander to add commands, https://www.npmjs.com/package/commander
 *
 *
 *
 **/

program.parse(process.argv)
