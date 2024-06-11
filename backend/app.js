
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');

const app = express();
require('dotenv').config()

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors())

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

app.get('/', (req, res) => {
    res.send("Hello World!")
})

const server = () => {
        db()
        app.listen(PORT, () => {
        console.log("Listening on port: ", PORT);
    })
}

server()

console.log('PORT:', process.env.PORT);
