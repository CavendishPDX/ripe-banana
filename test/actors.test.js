const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const connection = require('../lib/connection');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('actors REST HTTP API', () => {
    const DB_URI = 'mongodb://localhost:27017/ripe-banana-test';
    let db = null;

    before(() => connection.connect(DB_URI));
    before(() => connection.db.dropDatabase());
    after(() => connection.close());

    const request = chai.request(app);

    it('returns an empty array of actors', () => {
        return request.get('/actors')
            .then(req => req.body)
            .then(actors => {
                assert.deepEqual(actors, [])
                done();
            });
    });
});