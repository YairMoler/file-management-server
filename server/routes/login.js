var express = require('express');
var router = express.Router();
const fs = require('fs')

/* GET users listing. */
router.post('/', (req, res) => {
    const result = isExist(req.body)
    if (!result) {
        return res.status(400).send('this username is not exist')
    }
    res.send()
});
const isExist = (body) => {
    const files = fs.readdirSync('./users');
    const file = files.find(f => f === body.username)
    if(!file){
        return false;
    }
    return true;
}
module.exports = router;
