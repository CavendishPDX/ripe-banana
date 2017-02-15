const express = require('express');
const router = express.Router();

const Films = require('../models/films');

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data)
        .on('error', (error) => {
            reject(error);
        })
        .on('end', () => {
            const films = JSON.parse(body);
            resolve(films);
        })
    });
}

router
    .get('/', (req, res, next) => {
        Films.find()
            .then(films => {
                res.send(films)
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Films.findById(req.params.id)
            .populate( {path : 'films', select: '-_id'})
            .lean()
            .then(film => res.send(film))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        parseBody(req)
            .then(body => {
                return new Films(body).save();
            })
            .then(film => { res.send(film); })
            .catch(next);
    })

    module.exports = router;