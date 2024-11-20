const { dir } = require('console');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const fs2 = require('node:fs');
const path = require('path');

/* GET users listing. */
router.get('/:username', (req, res) => {
  const username = req.params.username;
  const filePath = path.join(__dirname, "..", `users/${username}`)
  const files = fs.readdirSync(filePath)
  if(files.length === 0){
    return res.status(400).send('this username is not exist')
  }
  res.send(files);
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

// const isFolderExist = (folderName, filePath) => {
//   const files = fs.readdirSync(`${filePath}`)
//   files.forEach((file) => {
//     const stats = fs2.statSync(file)
//     if (stats.isDirectory() && file === folderName)
//       return true
//   })
//   return false;
// }

// const isFileExist = (fileName, filePath) => {
//   const files = fs.readdirSync(`${filePath}`)
//   files.forEach((file) => {
//     const stats = fs2.statSync(file)
//     if (stats.isFile() && file === fileName)
//       return true
//   })
//   return false;
// }

router.delete(':username/:fileName', (req, res) => {
  const username = req.params.username;
  const filePath = path.join(__dirname, "..", `users/${username}`);
  const files = fs.readdirSync(`${filePath}`)
  const file = files.find(f => f === req.params.fileName)
  if (!file) return res.status(404).send('this file is not exist')
  const dirPath = path.join(__dirname, "..", `users/${username}/${req.params.fileName}`);
  const type = req.body.type;
  if (type === 'folder') {
    const insideFolder = fs.readdirSync(dirPath)
    if (insideFolder.length === 0) {
      fs.rmdir(dirPath, (err) => {
        if (err) {
          return res.status(404).send('something went wrong')
        }
        res.send('folder deleted')
      })
    }
    else {
      deleteFolderRecursive(dirPath);
    }
  }
  res.send(req.body.name)
})

const deleteFolderRecursive = (dirPath) => {
  const insideFolder = fs.readdirSync(dirPath)
  insideFolder.forEach(file => {

  })
}

router.put('/:username/:fileName', (req, res) => {
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
