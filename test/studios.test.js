const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = chai.request(app);

mongoose.Promise = global.Promise;

process.env.DB_URI = 'mongodb://localhost:27017/ripebanana-test';
// What is going on here?
require('../lib/connection');

let universal = {
    "name": "Universal Studios",
    "address": {
        "city": "Universal City",
        "state": "California",
        "country": "U.S.A"
    }
};

let warner = {
    "name": "Warner Bros.",
    "address": {
        "city": "Burbank",
        "state": "California",
        "country": "U.S.A"
    }
};

let walden = {
    "name": "Walden Media",
    "address": {
        "city": "Los Angeles",
        "state": "California",
        "country": "U.S.A"
    }
}


function saveStudio(studio) {
    return request.post('/studios')
        .send(studio)
        .then(res => res.body);
}

describe('studios REST HTTP API', () => {
    before(() => mongoose.connection.dropDatabase());
    after(() => mongoose.connection.close());

    const request = chai.request(app);

    it('GET returns empty array of studios', () => {
        return request.get('/studios')
            .then(req => req.body)
            .then(studios => {
                assert.deepEqual(studios, []);
            });

    });


    it('puts studio into database ', () => {
        return saveStudio(warner)
            .then(savedStudio => {
                assert.isDefined(savedStudio._id, ' the id is not undefined');
                warner._id = savedStudio._id;
                warner.__v = 0; // what is this?
            });
    });

    it('finds studio by id  ', () => {
        return request.get(`/studios/${ warner._id}`)
            .then(res => {
                assert.deepEqual(res.body._id, warner._id);

            });
    });
}); //end describe