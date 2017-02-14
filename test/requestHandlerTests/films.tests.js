const app = require('../../lib/app');

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-tests';
require('../../lib/connection');
const mongoose = require('mongoose');

describe('modern REST HTTP API', () => {
    before(() => {
        return mongoose.connection.dropDatabase();
    });
    const request = chai.request(app);

    it('GET returns array of films', () => {
        return request.get('/films')
        .then(req => req.body)
        .then(films => assert.deepEqual(films, {
            });
        });
    });
});