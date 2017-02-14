const mongoose = require('mongoose');
const Studios = require('./studios');
const Actors = require('./actors');

const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    studio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studios'
    },
    released: {
        type: String,
        required: true
    },
    actors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actors'
    },
    reviews: 
        [{
            rating: {
                type: Number,
                required: true
            },
            review: {
                type: String,
                required: true
            }
        }]
});

const Films = mongoose.model('Films', schema);
module.exports = Films;