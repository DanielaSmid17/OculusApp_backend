const express = require('express')
const router = express.Router();
const { users, ObjectId } = require("../db")
// const { userSchema } = require('../validation');
// const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    res.send('hello')
})

module.exports = module.exports = router;