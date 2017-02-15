const router = require('express').Router();
const Studios = require('../models/studios');

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('error', err => reject(err));
        req.on('end', () => {
            const studio = JSON.parse(body);
            resolve(studio);
        });
    });
}

router
    .get('/', (req, res, next) => {
        Studios.find()
            .then(studios => res.send(studios))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Studios.findById(req.params.id)
            .then(studio => {
                if (!studio) {
                    res.status(404).send('Cannot find ID: ', req.params.id);
                } else {
                    res.send(studio);
                }

            })
    })
    .post('/', (req, res, next) => {
        parseBody(req)
            .then(body => {
                return new Studios(body).save();
            })
            .then(studio => {
                res.send(studio);
            })
            .catch(next);
    });
//});
module.exports = router;