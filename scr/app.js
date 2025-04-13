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

const movie = require('./routes/movie')
const user = require('./routes/user')

app.use('/movies', movie)
app.use('/', user)

module.exports = app;