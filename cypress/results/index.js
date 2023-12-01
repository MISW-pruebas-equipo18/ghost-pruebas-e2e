const fs = require('fs')
const baseFolder = '../snapshots/base/';
const actualFolder = '../screenshots/';
const diffFolder = '../snapshots/diff/';
const path = require("path");
const urlVisit = 'http://localhost:3002/';


function imagesTypes(pathFolder){
    const images = [];

    fs.readdirSync(pathFolder).forEach((file) => {
        let fullPath = path.join(pathFolder, file);
        fs.readdirSync(fullPath).forEach((files) => {
            console.log(files);
            images.push(fullPath + "/" + files)
        });
    });
    //console.log(images)
    return images 
}

function createReport(){

    let baseImages = imagesTypes(baseFolder)
    let actualImages = imagesTypes(actualFolder)
    let diffImages = imagesTypes(diffFolder)
    
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for Ghost 5.73.2 
                 <a href="${urlVisit}"> ${urlVisit}</a>
            </h1>
            <div class=" browser" id="test0">
            <div class=" btitle">
                <h2>Browser: Chrome</h2>
            </div>
            <div class="imgline">
            <div class="imgcontainer">
            <h2>Base images</h2>
                ${baseImages.map(image => `<img class="img2" src="${image}" id="baseImage" label="base"></img>`).join('')}
            </div>
            <div class="imgcontainer">
            <h2>Actual images</h2>
                <span class="imgname">Actual</span>
                
            </div>
            </div>
            <div class="imgline">
            <div class="imgcontainer">
            <h2>Diff images</h2>
                <span class="imgname">Diff</span>
                
            </div>
            </div>
        </div>
        </body>
    </html>`
}

fs.writeFileSync(`./report.html`, createReport());

