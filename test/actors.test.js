const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = chai.request(app);

process.env.DB_URI = 'mongodb://localhost:27017/ripebanana-test';
require('../lib/connection');


describe('actors REST HTTP API', () => {
    before(() => mongoose.connection.dropDatabase());
    //mongoimport --db ripe-banana --collection films --drop --file 'data/films.json'
    
    let sarah = {
        name: 'Sarah Paulson',
        dob: '1974-12-17T00:00:00.000Z'
    }
    let jeff = {
        name: 'Jeff Bridges',
        dob: '4-12-1949'
    }
    let meryl = {
        name: 'Meryl Streep',
        dob: '22-8-1949'
    }

    function saveActor(actor) {
        return request.post('/actors')
            .send(actor)
            .then(res => res.body);
    }

    it('returns an empty array of actors', () => {
        return request.get('/actors')
            .then(req => req.body)
            .then(res => {
                assert.deepEqual(res, []);
            });
    });
    
    it('saves and posts new actors', () => {
        return saveActor(sarah)
            .then(savedActor => {
                assert.isDefined(savedActor._id, 'the id is not undefined');
                sarah._id = savedActor._id;
                sarah.__v = 0;
            });
    });

    it('finds an actor by their id', () => {
        return request.get(`/actors/${sarah._id}`)
                .then(res => {
                    assert.deepEqual(res.body, sarah);
                    console.log(res.body)
                });
    });
});
