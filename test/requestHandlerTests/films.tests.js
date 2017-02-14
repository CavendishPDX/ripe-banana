const app = require('../../lib/app');
const childProcess = require('child_process');
// const mocha = require('mocha');
// console.log(mocha);
// const describe = mocha.describe;
// const before = mocha.before;
// const it = mocha.it;

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-tests';
require('../../lib/connection');
const mongoose = require('mongoose');


describe('films API', () => {
    before(() => mongoose.connection.dropDatabase());

    const getCmd = collection => {
        return `mongoimport --db ripe-banana-tests --collection ${collection} --drop --file=./data/${collection}.json --jsonArray`;
    }

    before(done => {
        childProcess.exec('pwd', err => {
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
        const filmsData = require('../../data/films.json');
        console.log(filmsData);
        return request.get('/films')
        .then(res => {
            const films = res.body;
            assert.deepEqual(films, filmsData);
        });
    });
});
