const fs = require("fs");

const sendDir = (res, dirPath) => {
    let filesArr;
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            res.status(404).send("folder do not exist");
        }
        filesArr = files.map((file) => {
            return {
                name: file.name,
                type: file.isDirectory() ? "folder" : "file",
            };
        });
        res.json(filesArr);
    });
};

module.exports = sendDir;
