const express = require('express');
const Router = express.Router;
const router = Router();

const RipeBanana = require('../models');

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('error', err => reject(err));
        req.on('end', () => {
            const dbBody = JSON.parse(body);
            resolve(dbBody);
        });
    });
}

router
    .get('/', (req, res, next) => {
        const query = {};
        if (req.query.type) {
            query.type = req.query.type;
        };
        RipeBanana.find(query)
            .then(dbBody => res.send(dbBody))
            .catch(next);
    })

.get('/:id', (req, res) => {
    RipeBanana.findById(req.params.id)
        .then(dbBody => {
            if (!dbBody) {
                res.status(404).send({ error: `Id ${req.params.id} Not Found` })
            } else {
                res.send(dbBody);
            }
        })
})

.post('/', (req, res, next) => {
    req.mouthBreathing = 'fully loaded';
    next();
}, (req, res, next) => {
    parseBody(req)
        .then(body => {
            body.mouthBreathing = req.mouthBreathing;
            return new RipeBanana(body).save();
        })
        .then(dbBody => res.send(dbBody))
        .catch(next);
})

.put('/:id', (req, res) => {
            parseBody(req)
                .then(modern => {
                    return RipeBanana.findByIdAndUpdate(
                        req.params.id,
                        modern, { new: true, runValidators: true }
                    );
                })
                .then(dbBody => {
                        res.send(dbBody;
                        });
                })

        .delete('/:id', (req, res) => {
            RipeBanana.findByIdAndRemove(req.params.id)
                .then(deleted => {
                    res.send({ deleted: !!deleted });
                });
        });

        module.exports = router;