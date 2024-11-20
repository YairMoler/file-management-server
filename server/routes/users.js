var express = require("express");
const fs = require("fs");
const path = require("path");
const sendDir = require("../utils/sendDir");
const isFolder = require("../utils/isFolder");
var router = express.Router();

/* GET users listing. */
router.get("/:username", function (req, res, next) {
    const dirPath = path.normalize(`${__dirname}/../users/${req.params.username}`);
    sendDir(res, dirPath);
});

router.get("/:username/*", async (req, res, next) => {
    const dirPath = path.normalize(`${__dirname}/../users/${req.url}`);
    if (await isFolder(dirPath)) {
        sendDir(res, dirPath);
    }
    console.log("hi");
    res.sendFile(dirPath);
});
module.exports = router;
