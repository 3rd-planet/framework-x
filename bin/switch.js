const { runCmd, checkDirExist } = require("./methods")
const fs = require("fs")

const copyDirectoryToRoot = async (directoryPath, directoryName) => {
    console.log("copying " + directoryPath + " to root...")
    await fs.cpSync(directoryPath, __dirname + "/../" + directoryName, { recursive: true })
}

const copyFileToRoot = async (filePath, fileName) => {
    console.log("copying " + filePath + " to root...")
    await fs.copyFileSync(filePath, __dirname + "/../" + fileName)
}

const makeSwitch = async (argv) => {
    if (argv.length < 3) {
        console.log("Usage: switch <js|ts>")
        return
    }

    let srcDir = argv[2].toLowerCase() === "js" ? "src" : "src.ts"

    const directories = [
        "controllers",
        "helpers",
        "middlewares",
        "routes",
        "tests"
    ]

    const files = [
        "package.json",
        "index.js",
        "server.js"
    ]

    for (let i = 0; i < directories.length; i++) {
        await copyDirectoryToRoot(__dirname + "/../" + srcDir + "/" + directories[i], directories[i])
    }

    for (let i = 0; i < files.length; i++) {
        await copyFileToRoot(__dirname + "/../" + srcDir + "/" + files[i], files[i])
    }

    await runCmd("pnpm install")
}


makeSwitch(process.argv).then(r => {
    console.log("switched...")
})