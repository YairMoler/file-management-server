const fs = require("fs");

const sendDir = (res, dirPath) => {
    let filesArr;
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log("err: ", err);
            return res.status(404).send(err);
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
