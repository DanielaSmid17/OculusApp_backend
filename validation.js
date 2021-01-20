const Joi = require('joi')

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
    password: Joi.string().required(),
    password2: Joi.ref('password')
})


module.exports = { userSchema }