const fs = require("fs")
const path = require("path")

/**
 * Creates a controller file for the given controller name.
 * @param {string} name - The name of the controller.
 * @returns None
 */
exports.buildController = async (name) => {
    const filePath = path.join(__dirname, "../../controllers", `${name}.controller.js`)

    if (fs.existsSync(filePath)) {
        console.log(`Controller ${name} already exists.`)
        return
    }

    const stub = fs.readFileSync(path.join(__dirname, "../stubs/controller.stubs"), "utf8")
    const controller = stub.replace(/controller/g, name)

    let dirs = filePath.split("/")
    dirs.pop()

    const dir = dirs.join("/")
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFile(filePath, controller, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Controller ${name}.controller.js created successfully`)
        }
    })
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

    if (fs.existsSync(filePath)) {
        console.log(`Repository ${name} already exists.`)
        return
    }

    const stub = fs.readFileSync(path.join(__dirname, "../stubs/repository.stubs"), "utf8")
    const repository = stub.replace(/repositoryName/g, name)

    let dirs = filePath.split("/")
    dirs.pop()

    const dir = dirs.join("/")
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFile(filePath, repository, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Repository ${name}.repository.js created successfully`)
        }
    })
}
