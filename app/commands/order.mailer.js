exports.command = (program) => {
    program
        .command("order:mailer")
        .description("Sample Command, Usage: node x sample:command <argument>")
        .argument("<argument>", "Argument")
        .option("-o, --option <optionName>", "Option", null)
        .action(async (argument, option) => {
            handel(argument, option)
        })
}

const handel = (argument, option) => {
    console.log(argument, option)
}
