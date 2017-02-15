const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/ripe-banana';

mongoose.connect(dbUri);

mongoose.connection.on('connected', () => {
    console.log('connected to mongo');
});

module.exports = mongoose.connection;