const express = require('express');
const app = express();

const actors = require('./routes/actors');
const films = require('films.js');
const studios = require('studios');

const morgan = require('morgan');
app.use(morgan('dev'));

const path = require('path');

app.use('/actors', actors);
app.use('/films', films);
app.use('/studios', studios);

module.exports = app;