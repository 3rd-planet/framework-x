#!/usr/bin/env node

const { Command } = require("commander")
const program = new Command()
const { cliWatermark } = require("@3rdplanet/x-core/helpers/methods")

cliWatermark()

require("@3rdplanet/x-core/cli").init(program)

program.parse(process.argv)
