const fs = require("fs")
const path = require("path")

const builder = async (filePath, stubName) => {
    if (fs.existsSync(filePath)) {
        console.log(filePath + ` already exists.`)
        return false
    }

    const stub = fs.readFileSync(path.join(__dirname, "../stubs/" + stubName), "utf8")

    let dirs = filePath.split("/")
    dirs.pop()

    const dir = dirs.join("/")
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }

    return fs.writeFile(filePath, stub, (err) => {
        if (err) {
            console.log(err)

            return false
        }

        return true
    })
}

/**
 * Creates a controller file for the given controller name.
 * @param {string} name - The name of the controller.
 * @returns None
 */
exports.buildController = async (name) => {
    const filePath = path.join(__dirname, "../../controllers", `${name}.controller.js`)

    if (await builder(filePath, "controller.stubs")) {
        console.log(`Controller ${name}.controller.js created successfully`)
    }
}

/**
 * Creates a repository file for the given repository name.
 * @param {string} name - The name of the repository.
 * @returns None
 */
exports.buildRepository = async (name) => {
    let repoDir = path.join(__dirname, "../../repositories")

    if (!fs.existsSync(repoDir)) {
        fs.mkdirSync(repoDir, { recursive: true })
    }

    const filePath = path.join(repoDir, `${name}.repository.js`)

    if (await builder(filePath, "repository.stubs")) {
        console.log(`Repository ${name}.repository.js created successfully`)
    }
}

/**
 *
 * @param name
 * @returns {Promise<void>}
 */
exports.buildValidator = async (name) => {
    const filePath = path.join(__dirname, "../../middlewares/validators", `${name}.validations.js`)

    if (await builder(filePath, "validator.stubs")) {
        console.log(`Validator ${name}.validation.js created successfully`)
    }
}

exports.buildMiddleware = async (name) => {
    const filePath = path.join(__dirname, "../../middlewares", `${name}.middleware.js`)

    if (await builder(filePath, "middleware.stubs")) {
        console.log(`Middleware ${name}.middleware.js created successfully`)
    }
}
