const app = require('../../lib/app');
const childProcess = require('child_process');

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.DB_URI = 'mongodb://localhost:27017/ripe-banana-tests';
require('../../lib/connection');
const mongoose = require('mongoose');


describe('films API', () => {
    const request = chai.request(app);
    let films1 = {};

    before(() => mongoose.connection.dropDatabase());

    const getCmd = collection => {
        return `mongoimport --db ripe-banana-tests --collection ${collection} --drop --file=./data/${collection}.json --jsonArray`;
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

    it('GET returns a films array', () => {
        const filmsData = require('../../data/films.json');
        return request.get('/films')
        .then(res => {
            const films = res.body;
            films1 = films[0];
            assert.deepEqual(films.length, filmsData.length);
        });
    });


    it('GET by ID gets by ID', () => {
        const bigLebowskiId = films1._id;
        console.log(bigLebowskiId);
        return request.get(`/films/${bigLebowskiId}`)
        .then(res => {
            const lebowski = res.body;
            assert.equal(lebowski.title, 'The Big Lebowski');
        });
    });
});
