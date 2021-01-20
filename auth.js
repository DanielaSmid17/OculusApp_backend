const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretTokenKey = process.env.SECRET_TOKEN_KEY


const createsignupToken = (email, firstName, lastName) => {
    console.log();
    const token = jwt.sign(JSON.stringify({ email, firstName, lastName }), secretTokenKey)
    return token
}

const createLoginToken = (email, id, firstName, lastName) => {
    console.log();
    const token = jwt.sign(JSON.stringify({ email, id, firstName, lastName }), secretTokenKey)
    return token
}


const verifyToken = async (token) => {
    try {
        await jwt.verify(token, secretTokenKey)
    } catch (err) {
        return err;
    }
}

module.exports = { createsignupToken, createLoginToken }