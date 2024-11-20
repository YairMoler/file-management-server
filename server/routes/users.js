var express = require("express");
const fs = require("fs");
const path = require("path");
var router = express.Router();

/* GET users listing. */
router.get("/:username", function (req, res, next) {
    console.log("req.params.username: ", req.params.username);
    let filesArr;
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) return console.log(err);
        filesArr = files.map((file) => {
            return {
                name: file.name,
                type: file.isDirectory() ? "folder" : "file",
            };
        });
        res.json(filesArr);
    });
    res.send(JSON.stringify(filesArr));
});

module.exports = router;
