#!/usr/bin/env node

const { Command } = require("commander")
const program = new Command()
require("@3rdplanet/x-core").init(program)

program.parse(process.argv)
