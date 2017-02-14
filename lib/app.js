const express = require('express');
const app = express();

const actors = require('./routes/actors');
const films = require('./routes/films');
const studios = require('./routes/studios');

const morgan = require('morgan')('dev');
app.use(morgan);

// where should path get used
const path = require('path');

app.use('/actors', actors);
app.use('/films', films);
app.use('/studios', studios);

module.exports = app;