const fs = require('fs');
const path = require('path');

(async () => {
    const globalPathToFolder = 'C:\\Users\\DANKOS\\Downloads';

    const baseFolder = path.resolve(globalPathToFolder)
    const onlyFileNames = fs.readdirSync(baseFolder, {
        withFileTypes: true
    }).filter((dirent) => dirent.isFile())

    onlyFileNames.forEach(dirent => {
        if (dirent.isFile()){
            console.log(dirent.name)
            const ext = path.extname(dirent.name).slice(1);
            const newDir = path.join(globalPathToFolder, ext);

            if(!fs.existsSync(newDir)){
                fs.mkdirSync(newDir)
                console.log(`newDir: ${newDir}`)
            }
            const oldFilePath = path.join(globalPathToFolder, dirent.name);
            const newFilePath = path.join(globalPathToFolder, ext, dirent.name);
            fs.rename(oldFilePath, newFilePath, function (err) {
                if (err) throw err
                console.log(`* "${dirent.name}" moved to "${ext}" directory`)
            })
        }
    });
})();
