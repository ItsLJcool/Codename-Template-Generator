const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

function createUniqueFolder(baseFolderPath) {
    // Define the initial folder name
    let folderName = path.basename(baseFolderPath);
    let dirPath = path.dirname(baseFolderPath);
    let newFolderPath = baseFolderPath;
    let count = 1;

    // Check if the folder already exists
    while (fs.existsSync(newFolderPath)) {
        // Create a new folder name by appending a counter
        newFolderPath = path.join(dirPath, `${folderName} #${count}`);
        count++;
    }

    // Create the new folder
    fs.mkdirSync(newFolderPath);
    return newFolderPath;
}

const FoldersToCreate = [
    {
        name: "images",
        files: [ {name: "characters"} ],
    }, {
        name: "data",
        files: [
            {
                name: "dialogue",
                files: [ {name: "boxes"}, {name: "characters"} ],
            }, 
            {name: "characters"}, {name: "stages"}, {name: "states"}, {name: "notes"}, {name: "splashes"}, {name: "config"}, {name: "titlescreen"}, {name: "weeks"}, 
        ],
    }, { name: "songs" },
    { name: "music" },
    { name: "sounds" },
    { name: "fonts" },
    { name: "shaders" },
    { name: "videos", },
    { name: "ndlls" },
];
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const TEMPLATE_NAME = "Template Mod By ItsLJcool";

const README = 
`
Hi! Thanks for using Codename Engine Template Mod Generator!

This is a template mod that you can use to create your own mods. It contains all the files you need to get started.

Visit the [CNE Wiki](https://codename-engine.com/) to see all the uses for these files!
`

function main() {
    let path = args[0];
    if (path == undefined) path = __dirname;

    path = createUniqueFolder(`${path}/${TEMPLATE_NAME}`);
    
    for (const folder of FoldersToCreate) {
        createFolderRecursive(path, folder);
    }

    fs.writeFileSync(`${path}/README.md`, README, 'utf8');
    
    // await sleep(2000);
}

function createFolderRecursive(path, data) {
    const folderPath = `${path}/${data.name}/`;

    if (!fs.existsSync(folderPath)) {
        try {
            fs.mkdirSync(folderPath);
        } catch (error) {
            console.error(error);
            process.exit();
            return;
        }
    }
    
    if (data.files == undefined) return;
    for (const file of data.files) {
        createFolderRecursive(folderPath, file);
    }
}

main();