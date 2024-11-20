const fs = require("node:fs/promises");

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
        await fs.stat(dir);
        return true;
    } catch (err) {
        return false;
    }
};

module.exports = { isFolder, doesExist };
