var express = require("express");
var router = express.Router();
const fs = require("node:fs/promises");
const path = require("path");
const getUser = require("../utils/getUser");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const user = await getUser(username);
    if (user) return res.status(400).send("username already exists");
    const dataPath = path.normalize(`${__dirname}/../data/users.json`);
    const userArray = JSON.parse(await fs.readFile(dataPath, { encoding: "utf8" }));
    const newUser = {
        username: username,
        password: password,
    };
    userArray.users.push(newUser);
    try {
        await fs.writeFile(dataPath, JSON.stringify(userArray));
        await fs.mkdir(path.normalize(`${__dirname}/../users/${username}`));
        res.send(newUser);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.msg);
    }
});

module.exports = router;
