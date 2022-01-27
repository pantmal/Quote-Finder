
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

//db.on('error', (error) => console.error(error))
db.once('open', () => console.log('We are conected!'))

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

const usersRouter = require('./routes/users')
const quotesRouter = require('./routes/quotes')

app.use('/users', usersRouter)
app.use('/quotes', quotesRouter)

app.listen(5000, ()=> console.log('Api started...'))
