const fs = require("fs")
const packageJsonfile = require("../package.json")

const switchMode = async (argvs) => {
    if (argvs.length < 3) {
        console.log("Please specify mode (js, ts)")
        return
    }

    const mode = argvs[2].toLowerCase()

    // available modes: js, ts
    if (mode !== "js" && mode !== "ts") {
        console.log("Invalid mode")
        return
    }

    if (mode === "js") {
        await switchToJS()
    }

    if (mode === "ts") {
        await switchToTS()
    }
}


const switchToJS = async () => {
    console.log("Switching to JS")
    console.log("----------")

    const packageJsonfile = require("../package.json")
    const jsPackageJson = require("../src.js/package.json")
    const tsPackageJson = require("../src.ts/package.json")

    let uncombinedDevDependencies =
        Object.keys(packageJsonfile.devDependencies)
            .filter(key => !Object.keys(tsPackageJson.devDependencies).includes(key))
            .reduce((obj, key) => {
                    obj[key] = packageJsonfile.devDependencies[key]
                    return obj
                }
                , {})

    let updatedPackageJson = {
        ...packageJsonfile,
        ...jsPackageJson,
        devDependencies: uncombinedDevDependencies
    }

    await writePackageJson(updatedPackageJson)
}
const switchToTS = async () => {
    console.log("Switching to TS")
    console.log("----------")

    const packageJsonfile = require("../package.json")
    const tsPackageJson = require("../src.ts/package.json")

    let combinedDevDependencies = {
        ...packageJsonfile.devDependencies,
        ...tsPackageJson.devDependencies
    }

    let updatedPackageJson = {
        ...packageJsonfile,
        ...tsPackageJson,
        devDependencies: combinedDevDependencies
    }

    await writePackageJson(updatedPackageJson)
}

const writePackageJson = async (updatePackageJson) => {
    console.log(JSON.stringify(updatePackageJson))
    console.log("----------")
    console.log("if package.json is not updated, copy the above json and paste it to package.json, format it and run \"pnpm install\"")
    console.log("----------")
    console.log("----------")
    await fs.writeFile("../package.json", JSON.stringify(updatePackageJson, null, 4), (err) => {
        if (err) throw err
        //console.log("package.json updated")
    })
}

switchMode(process.argv).then(() => {
    //console.log("Switched mode")
})