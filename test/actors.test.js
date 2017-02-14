const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = chai.request(app);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripebanana-test';
require('../lib/connection');


describe('actors REST HTTP API', () => {
    before(() => mongoose.connection.dropDatabase());
    //mongoimport --db ripe-banana --collection films --drop --file 'data/films.json'
    
    let sarah = {
        name: 'Sarah Paulson',
        dob: '17-12-1974'
    }
    let jeff = {
        name: 'Jeff Bridges',
        dob: '4-12-1949'
    }
    let meryl = {
        name: 'Meryl Streep',
        dob: '22-8-1949'
    }

    it('returns an empty array of actors', () => {
        return request.get('/actors')
            .then(req => req.body)
            .then(res => {
                assert.deepEqual(res, []);
            });
    });

    
});