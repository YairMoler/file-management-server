const { dir } = require('console');
var express = require("express");
const fs = require("fs");
const path = require("path");
const sendDir = require("../utils/sendDir");
const isFolder = require("../utils/isFolder");
var router = express.Router();
const fs2 = require('node:fs');

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

router.post('/:username', (req, res) => {
  const username = req.params.username;
  const filePath = path.join(__dirname, "..", `users/${username}`)
  if (req.body.type === 'folder') {
    const folderName = req.body.name;
    // if (isFolderExist(folderName, filePath)) {
    //   return res.status(400).send('this folder is already exist');
    // }
    fs.mkdir(`${filePath}/${folderName}`, (err) => {
      console.log(folderName)
      if (err) {
        return res.status(404).send('something went wrong')
      }
      res.send('directory created')
    });
  }
  else {
    const fileName = req.body.name;
    // if(isFileExist(fileName, filePath)){
    //   return res.status(400).send('this file is already exist');
    // }
    fs.open(`${filePath}/${fileName}`, "w", (err) => {
      if (err) {
        return res.status(404).send('something went wrong')
      }
      res.send('file created')
    })
  }
})

router.patch('/:username/:fileName', (req, res) => {
  const username = req.params.username;
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "..", `users/${username}`);
  const files = fs.readdirSync(`${filePath}`)
  const file = files.find(f => f === req.params.fileName)
  if (!file) return res.status(404).send('this file is not exist')
  const oldFilePath = path.join(__dirname, "..", `users/${username}/${fileName}`);
  const newFilePath = path.join(__dirname, "..", `users/${username}/${req.body.name}`);
  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      return res.status(404).send('something went wrong')
    }
  }) 
  res.send('file updated')
})
module.exports = router;
