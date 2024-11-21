const fs = require("node:fs/promises");
const path = require("path");

const getUser = async (username) => {
    const userArray = JSON.parse(await fs.readFile(path.normalize(`${__dirname}/../data/users.json`), { encoding: "utf8" }));
    console.log("userArray: ", userArray);
    console.log("username: ", username);
    return userArray.users.find((user) => {
        return user.username === username;
    });
};

module.exports = getUser;
