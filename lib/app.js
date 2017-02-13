const express = require('express');
const app = express();

const actors = require('./lib/routes/actors');
const films = require('./lib/routes/films.js');
const studios = require('./lib/routes/studios');

const morgan = require('morgan');
app.use(morgan('dev'));

// where should path get used
const path = require('path');

app.use('/actors', actors);
app.use('/films', films);
app.use('/studios', studios);

module.exports = app;