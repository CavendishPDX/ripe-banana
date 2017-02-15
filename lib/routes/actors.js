const express = require('express');
const Router = express.Router;
const router = Router();

const Actor = require('../models/actors');

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('error', err => reject(err));
        req.on('end', () => {
            const newData = JSON.parse(body);
            resolve(newData);
        });
    });
}

router 
    .get('/', (req, res, next) => {
        Actor.find()
            .then(actors => res.send(actors))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Actor.findById(req.params.id)
            .then(actor => {
                if(!actor) {
                    res.status(404).send('Cannot find ID');
                } else {
                    res.send(actor);
                }

        })
    })    

    .post('/', (req, res, next) => {
        parseBody(req)
            .then(body => {
                return new Actor(body).save();
            })
            .then(actor => { res.send(actor); })
            .catch(next);
    })

module.exports = router;