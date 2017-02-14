const app = require('../../lib/app');

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-tests';
require('../../lib/connection');
const mongoose = require('mongoose');

describe('films API', () => {
    before(() => mongoose.connection.dropDatabase());

    const getCMD = collection => {
        return `mongoimport --file=./test/${collection}.json -d ripe-banana-test -c ${collection} --jsonArray`;
    }

    before(done => {
        childProcess.exec(getCmd('films'), err => {
            if(err) return done(err);
            else{
                childProcess.exec(getCmd('studios'), err => {
                    if(err) return done(err);
                    else{
                        childProcess.exec(getCmd('actors'), done);
                    }
                })
            }
        })
    })

    const request = chai.request(app);

    it('GET returns a films array', () => {
        return request.get('/films')
        .then(res => {
            const films = res.body;
            assert.deepEqual(films, [{
        "title":  "The Big Lebowski",
        "studio": "58a342a78b19786bae2b414d",
        "released": "6-3-1998",
        "actors": ["58a348588b19786bae2b418f"],
        "reviews": [{
            "rating": 5,
            "review": "A hilariously clever romp with fine performances and great pacing"
        }]
},

{
        "title":  "Who's Afraid of Virginia Woolf",
        "studio": "58a342a78b19786bae2b414e",
        "released": "22-6-1966",
        "actors": ["58a348588b19786bae2b418e", "58a348588b19786bae2b418c"],
        "reviews": [{
            "rating": 5,
            "review": "An undisputed classic featuring stunning performances from world-class actors"
        }]
},

{
        "title":  "The Giver",
        "studio": "58a342a78b19786bae2b414f",
        "released": "15-8-2014",
        "actors": ["58a348588b19786bae2b418f", "58a348588b19786bae2b418d"],
        "reviews": [{
            "rating": 3,
            "review": "Enjoyable, with stellar performances from Meryl Streep and Jeff Bridges, but ultimately forgettable"
        }]
},

{
        "title":  "Serenity",
        "studio": "58a342a78b19786bae2b414d",
        "released": "30-9-2005",
        "actors": ["58a348588b19786bae2b418b"],
        "reviews": [{
            "rating": 4,
            "review": "Will not disappoint either fans of the series 'Firefly' or people completely new to Joss Whedon's space western"
        }]
},

{
        "title":  "It's Complicated",
        "studio": "58a342a78b19786bae2b414d",
        "released": "25-12-2009",
        "actors": ["58a348588b19786bae2b418d"],
        "reviews": [{
            "rating": 4,
            "review": "Fast-paced, smart comedy showcasing the well-aged talents of Meryl Streep, Alec Baldwin and Steve Martin"
        }]
            }
            ]);
        });
    });
});