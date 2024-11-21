const { dir } = require("console");
var express = require("express");
const fs = require("fs");
const path = require("path");
const sendDir = require("../utils/sendDir");
const { isFolder, doesExist } = require("../utils/isFolder");
var router = express.Router();
router.get("/:username", function (req, res, next) {
  const dirPath = path.normalize(`${__dirname}/../users/${req.params.username}`);
  sendDir(res, dirPath);
});
/* GET method*/
router.get("/:username/*", async (req, res, next) => {
    const dirPath = path.normalize(`${__dirname}/../users/${req.url}`);
    if (!(await doesExist(dirPath))) return res.status(404).send("does not exist");
    if (await isFolder(dirPath)) {
        sendDir(res, dirPath);
    }
    console.log("hi");
    res.sendFile(dirPath);
});

/* POST Method*/
router.post("/:username/*", (req, res) => {
    const filePath = path.normalize(`${__dirname}/../users/${req.url}`);
    console.log("filePath: ", filePath);
    console.log("req.body: ", req.body);
    if (!req.body.name || !req.body.type) {
        console.log("no request body");
        return res.status(400).send("no request body");
    }
    if (req.body.type === "folder") {
        const folderName = req.body.name;
        fs.mkdir(`${filePath}/${folderName}`, (err) => {
            console.log(folderName);
            if (err) {
                console.log("err: ", err);
                return res.status(400).send(err);
            }
            res.send("directory created");
        });
    } else {
        const fileName = req.body.name;
        fs.open(`${filePath}/${fileName}`, "w", (err) => {
            if (err) {
                console.log("err: ", err);
                return res.status(400).send(err);
            }
            res.send("file created");
        });
    }
});

/* PATCH method*/
router.patch("/:username/*", (req, res) => {
    const filePath = path.normalize(`${__dirname}/../users/${req.url}`);
    console.log("filePath: ", filePath);
    console.log("req.url: ", req.url);
    const newFilePath = path.normalize(`${__dirname}/../users/${req.url}/../${req.body.name}`);
    console.log("newFilePath: ", newFilePath);
    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            console.log(err);
            return res.status(404).send(err);
        }
    });
    res.send("file updated");
});

/* DELETE method*/
router.delete("/:username/*", async (req, res) => {
    const filePath = path.normalize(`${__dirname}/../users/${req.url}`);
    console.log("filePath: ", filePath);
    if (!(await doesExist(filePath))) return res.status(404).send("does not exist");
    if (await isFolder(filePath)) {
        console.log("in folder");
        fs.rmdir(filePath, (err) => {
            if (err) {
                console.log("hi");
                console.log(err);
                res.status(404).send(err).end();
            }
        });
        return;
    }
    fs.rm(filePath, (err) => {
        console.log("in file");
        if (err) {
            console.log(err);
            return res.status(404).send(err).end();
        }
    });
    res.send("deleted successfully").end();
});

module.exports = router;
