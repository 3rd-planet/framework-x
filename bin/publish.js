const { runCmd } = require("./methods")
const packageJson = require("../package.json")

const publish = async () => {
    let v = "v" + packageJson.version
    console.log(v)

    let gitAdd = 'git add . && git commit -m "' + v + '"'
    console.log(gitAdd)
    await runCmd(gitAdd)

    let gitTag = "git tag -a " + v + ' -m "' + v + '"'
    console.log(gitTag)
    await runCmd(gitTag)

    let gitPush = "git push"
    console.log(gitPush)
    await runCmd(gitPush)

    let gitPushTag = "git push origin --tag"
    console.log(gitPushTag)
    await runCmd(gitPushTag)

    let docPublish = "mkdocs gh-deploy"
    console.log(docPublish)
    await runCmd(docPublish)

    let npmPublish = "npm publish"
    console.log(npmPublish)
    await runCmd(npmPublish)
}

publish().then(() => {
    console.log("published....")
})
