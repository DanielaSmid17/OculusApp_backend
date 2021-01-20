const express = require('express')
const router = express.Router();
const { users } = require("../db")
const { userSchema } = require('../validation');
const bcrypt = require('bcrypt')
const { createsignupToken } = require('../auth')

router.post('/', async (req, res) => {
    const { error } = await userSchema.validate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2
    })
    if (error) return res.status(400).send(error.details[0].message)
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)
    let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password,

    }

    const email = req.body.email
    try {
        const emailInDB = await users().find({ email }).toArray();
        if (emailInDB.length !== 0)
            return res.status(400).send(`The email ${email} that you entered has already been registered, try again with a different email or login!`);
        else {
            await users().insertOne(newUser)
            const token = createsignupToken(email, req.body.firstName, req.body.lastName)
            return res.send(token)
        }
    } catch (err) {
        res.send(err)
    }

})

module.exports = module.exports = router;