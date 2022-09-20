const { buildController, buildRepository } = require("./build")

/**
 * Initializes the program.
 * @param {Program} program - The program object.
 * @returns none
 */
exports.init = async (program) => {
    program
        .command("build:controller")
        .description("Build Controller, Usage: node ebp build:controller <controller-name>")
        .argument("<controllerName>", "Controller Name")
        .action(async (controllerName) => {
            console.log(`Building Controller: ${controllerName}`)
            await buildController(controllerName)
        })

    program
        .command("build:repository")
        .description("Build Repository, Usage: node ebp build:repository <repository-name>")
        .argument("<repositoryName>", "Repository Name")
        .action(async (repositoryName) => {
            console.log(`Building Repository: ${repositoryName}`)
            await buildRepository(repositoryName)
        })
}
