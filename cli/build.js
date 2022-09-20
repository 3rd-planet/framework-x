const fs = require("fs")
const path = require("path")

/**
 * Creates a controller file for the given controller name.
 * @param {string} name - The name of the controller.
 * @returns None
 */
exports.buildController = async (name) => {
    const filePath = path.join(__dirname, "../controllers", `${name}.controller.js`)

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
            console.log(`Controller ${name} created successfully`)
        }
    })
}
