const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const { initializeDB } = require('./db')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



initializeDB()

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})