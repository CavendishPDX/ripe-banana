const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/ripe-banana'

mongoose.connect('mongodb://localhost:27017/ripe-banana');

mongoose.connection.on('connected', () => {
    console.log('connected to mongo');
});