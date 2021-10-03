const {execSync} = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.');
    console.log('For example :');
    console.log('npx create-express-boilerplate my-app');
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = "https://github.com/msamgan/expressjs-api-boilerplate.git";

try {
    fs.mkdirSync(projectPath);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
        console.log(error);
    }
    process.exit(1);
}

async function main() {
    try {
        console.log('Downloading files...');
        execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);

        process.chdir(projectPath);

        console.log('Installing dependencies...');
        execSync('npm install');

        console.log('Removing useless files')
        execSync('npx rimraf ./.git');
        fs.rmdirSync(path.join(projectPath, 'bin'), {recursive: true});

        console.log('The installation is done, this is ready to use !');

    } catch (error) {
        console.log(error);
    }
}

main();