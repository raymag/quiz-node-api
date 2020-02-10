const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes') // includes the routes.js file

require('dotenv').config()

app.use(express.json()) // we need to tell server to use json as well
app.use(routes) // tells the server to use the routes in routes.js

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))

app.listen(process.env.PORT | 3333, () => {
    console.log("The api is running...")
})