const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.end('Hello this is telegram bot')
})


module.exports = app