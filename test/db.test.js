const assert = require('chai').assert;
const mongoose = require('mongoose');
const connection = require('../lib/connection');

DB_URI = 'mongodb://localhost:27017/ripebanana-test';

describe('connect to db', () => {
    let db = null;

    before(() => {
        return connection.connect(DB_URI)
            .then(_db => db = _db)
    });

    it('resolved db from .connect() same as connection.db', () => {
        assert.strictEqual(db, connection.db);
    });

    it('returns an error on a second connect call', () => {
        return connection.connect('mongodb://localhost:27017/local')
            .then (
                () => {throw new Error('should not resolve');},
                () => true
            );
    });

    it('clears connection.db on close', () => {
        return connection.close()
            .then(() => assert.isNull(connection.db));
    });
});