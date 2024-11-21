const fs = require("node:fs/promises");
const fsSync = require("fs")

const isFolder = async (dir) => {
    try {
        return (await fs.stat(dir)).isDirectory();
    } catch (err) {
        console.log(err);
        return err;
    }
};
const doesExist = async (dir) => {
    try {
        return fsSync.existsSync(dir, fs.constants.F_OK);;
    } catch (err) {
        console.log(err)
        return false;
    }
};

module.exports = { isFolder, doesExist };
