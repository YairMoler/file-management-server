var express = require("express");
var router = express.Router();
const fs = require("node:fs/promises");
const path = require("path");
const getUser = require("../utils/getUser");
/* GET users listing. */
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const user = await getUser(username);
    console.log("user: ", user);
    if (!user) {
        console.log("hi");
        return res.status(400).send("wrong username or password");
    }
    console.log("(user.password: ", user.password);
    if (user.password !== password) return res.status(400).send("wrong username or password");
    res.send(user);
});

module.exports = router;
