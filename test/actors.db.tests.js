const assert = require('chai').assert;
const Actor = require('../lib/models/actors');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

describe('actor schema', () => {
    it('example data with all fields', () => {
        return new Actor({ name: 'Sarah Paulson', dob: '17-12-1974' })
            .validate(Actor)
            .then(actor => console.log(actor))
            .catch(err => { throw err; });
    });
});