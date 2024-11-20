const fs = require("node:fs/promises");

const isFolder = async (dir) => {
    console.log("dir: ", dir);
    return (await fs.stat(dir)).isDirectory();
};

module.exports = isFolder;
