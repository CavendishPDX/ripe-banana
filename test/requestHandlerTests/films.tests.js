const app = require('../../lib/app');

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/films-test';
require('../../lib/connection');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

describe('modern REST HTTP API', () => {
    before(() => {
         return mongoose.connection.dropDatabase();
    });
    const request = chai.request(app);

    it('GET returns array of films', () => {
        return request.get('/films')
        .then(req => req.body)
        .then(films => assert.deepEqual(films, {
    "films" : [{
        "title":  "The Big Lebowski",
        "studio": "//INSERT STUDIO ID FOR UNIVERSAL STUDIOS HERE",
        "released": "6-3-1998",
        "actors": "//INSERT ACTOR ID FOR JEFF BRIDGES",
        "reviews": [{
            "rating": 5,
            "review": "A hilariously clever romp with fine performances and great pacing"
        }]
    },

    {
        "title":  "Who's Afraid of Virginia Woolf",
        "studio": "//INSERT STUDIO ID FOR WARNER BROS",
        "released": "22-6-1966",
        "actors": "//INSERT ACTOR ID FOR RICHARD BURTON AND ELIZABETH TAYLOR",
        "reviews": [{
            "rating": 5,
            "review": "An undisputed classic featuring stunning performances from world-class actors"
        }]
    },

    {
        "title":  "The Giver",
        "studio": "//INSERT STUDIO ID FOR WALDEN MEDIA",
        "released": "15-8-2014",
        "actors": "//INSERT ACTOR ID FOR MERYL STREEP AND JEFF BRIDGES",
        "reviews": [{
            "rating": 3,
            "review": "Enjoyable, with stellar performances from Meryl Streep and Jeff Bridges, but ultimately forgettable"
        }]
    },

    {
        "title":  "Serenity",
        "studio": "//INSERT STUDIO ID FOR UnIVERSAL STUDIOS",
        "released": "30-9-2005",
        "actors": "//INSERT ACTOR ID FOR SARAH PAULSON",
        "reviews": [{
            "rating": 4,
            "review": "Will not disappoint either fans of the series 'Firefly' or people completely new to Joss Whedon's space western"
        }]
    },

    {
        "title":  "It's Complicated",
        "studio": "//INSERT STUDIO ID FOR UNIVERSAL STUDIOS",
        "released": "25-12-2009",
        "actors": "//INSERT ACTOR ID FOR MERYL STREEP",
        "reviews": [{
            "rating": 4,
            "review": "Fast-paced, smart comedy showcasing the well-aged talents of Meryl Streep, Alec Baldwin and Steve Martin"
        }]
    }]
}))
    })
})