const express = require('express');
const Router = express.Router;
const router = Router();

const Actor = require('../models/actors');

mongoose.Promise = Promise



router 
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.type) query.type = req.query.type;

        Actor.find(query)
            .then(actors => res.send(actors))
            .catch(next);
    })

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