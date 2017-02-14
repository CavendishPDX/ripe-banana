const express = require('express');
const Router = express.Router;
const router = Router();

const Actor = require('../models/actors');


module.exports = router 
    .get('/', (req, res, next) => {
        Actor.find()
            .then(actors => res.send(actors))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Actor.findById(req.params.id)
            .then(actor => res.send(actor))
            .catch(next);
    });

