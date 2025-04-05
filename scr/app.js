const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const db = require('./config/db')
const app = express(); 

app.use(morgan('dev'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

const auth = require('./middlewares/middleware')
const movie = require('./routes/movie')
const admin = require('./routes/user')

app.use('/movies', movie)
app.use('/admin',auth, admin)

module.exports = app;