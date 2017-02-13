const router = require('express').Router();
const Studios = require('../models/studios');

router
    .get('/', (req, res, next) => {
        Studios.find()
            .then(studios => res.send(studios))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        const studioId = req.params.id;

        Promise(
                Studios.findById(studioId).lean()
            )
            .then(results => {
                const studios = results[0];
                console.log(studios);
                res.send(studios);
            })
            .catch(next);
    });
module.exports = router;