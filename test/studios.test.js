const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const connection = require('../lib/connection');
const app = require('../lib/app');

describe('studios REST HTTP API', () => {

    const DB_URI = 'mongodb://localhost:27017/ripe-banana';
    let db = null;

    before(() => connection.connect(DB_URI));
    before(() => connection.db.dropDatabase());
    after(() => connection.close());

    const request = chai.request(app);

    it('GET returns array of studios', () => {
        return request.get('/studios')
            .then(req => req.body)
            .then(studios => assert.deepEqual(studios, []));
    });
}); //end describe