const express = require('express')
const router = express.Router();
const { users } = require("../db")
const { loginSchema } = require('../validation');
const bcrypt = require('bcrypt')
const { createLoginToken } = require('../auth')

router.post('/', async (req, res) => {
    console.log(req.body);
    const email = req.body.email
    const password = req.body.password
    const { error } = await loginSchema.validate({
        email,
        password,
    })
    if (error) return res.status(400).send(error.details[0].message)
    const dbUser = await users().find({ email: email }).toArray();
    const user = dbUser[0]
    if (!user) {
        return res.status(404).send(`This email ${email} hasn't been registered, please sign up or try with a different email account`);
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        res.status(400).send('Password is incorrect');
    }
    const token = createLoginToken(user.email, user._id, user.firstName, user.lastName);
    res.send(token)
})


module.exports = router