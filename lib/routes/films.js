const express = require('express');
//const Router = express.Router;
const router = express.Router();

//const Films = require('../models/films');

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('error', () => {
            const modern = JSON.parse(body);
            resolve(films);
        });
    });
}

router
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.type) {
            query.type = req.query.type
        };
        // Films.find(query)
        //     .then(films => res.send(films))
        //     .catch(next);
    })

    // .get('/:id', (req, res) => {
    //     Films.findById(req.params.id)
    //         .then(films => {
    //             if(!films){
    //                 res.status(404).send({ error: `Id ${req.params.id} Not Found`})
    //             }
    //             else {
    //                 res.send(films)
    //             }
    //         })
    // })

    // .post('/films', (req, res, next) => {
    //     req.
    // })

    module.exports = router;