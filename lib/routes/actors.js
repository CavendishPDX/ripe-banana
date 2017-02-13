const express = require('express');
const Router = express.Router;
const router = Router();

const Actor = require('../models/actors');


router 
    .get('/', (req, res, next) => {
        Actor.find()
            .then(actors => res.send(actors))
            .catch(next);
    })

    .get('/:id', (req, res) => {
        const actorId = req.params.id;

            Promise(
                Actor.findById(actorId).lean()
            )
            .then(actor => {
               const actors = results[0];
               res.send(actors);
            })
            .catch(next);
    });        

    // .get('/:id', (req, res) => {
    //     Actor.findById(req.params.id)
    //         .then(results => {
    //             const actors = results[0];
    //             console.log(actors);
    //             res.send(actors);
    //         })
    //         .catch(next)
    // });

module.exports = router;