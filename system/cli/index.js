const { buildController, buildRepository, buildValidator, buildMiddleware } = require("./build")

/**
 * Initializes the program.
 * @param program - The program object.
 * @returns none
 */
exports.init = async (program) => {
    program
        .command("build:controller")
        .description("Build Controller, Usage: node x build:controller <controller-name>")
        .argument("<controllerName>", "Controller Name")
        .action(async (controllerName) => {
            console.log(`Building Controller: ${controllerName}`)
            await buildController(controllerName)
        })

    program
        .command("build:repository")
        .description("Build Repository, Usage: node x build:repository <repository-name>")
        .argument("<repositoryName>", "Repository Name")
        .action(async (repositoryName) => {
            console.log(`Building Repository: ${repositoryName}`)
            await buildRepository(repositoryName)
        })

    program
        .command("build:validator")
        .description("Build Validator, Usage: node x build:validator <validator-name>")
        .argument("<validatorName>", "Validator Name")
        .action(async (validatorName) => {
            console.log(`Building Validator: ${validatorName}`)
            await buildValidator(validatorName)
        })

    program
        .command("build:middleware")
        .description("Build Middleware, Usage: node x build:middleware <middleware-name>")
        .argument("<middlewareName>", "Middleware Name")
        .action(async (middlewareName) => {
            console.log(`Building Middleware: ${middlewareName}`)
            await buildMiddleware(middlewareName)
        })
}
