const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const { initializeDB } = require('./db')
const users = require('./routes/users')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', users)

initializeDB()

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})