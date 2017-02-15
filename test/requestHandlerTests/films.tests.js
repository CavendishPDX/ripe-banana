const app = require('../../lib/app');
const childProcess = require('child_process');

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const mongoose = require('mongoose');
process.env.DB_URI = 'mongodb://localhost:27017/ripe-banana-tests';
require('../../lib/connection');


describe('films API', () => {
    const request = chai.request(app);
    let films1 = {};

    let seventhSon = {};

    function saveFilm(film) {
        //console.log('in saveFilm ', film);
        return request.post('/films')
            .send(film)
            .then(res => {
                return res.body;
            });
    }



    before(() => mongoose.connection.dropDatabase());

    const getCmd = collection => {
        return `mongoimport --db ripe-banana-tests --collection ${collection} --drop --file=./data/${collection}.json --jsonArray`;
    }

    before(done => {
        childProcess.exec(getCmd('films'), err => {
            if(err) return done(err);
            else{
                childProcess.exec(getCmd('studios'), err => {
                    if(err) return done(err);
                    else{
                        childProcess.exec(getCmd('actors'), done);
                    }
                })
            }
        })
    })

    it('GET returns a films array', () => {
        const filmsData = require('../../data/films.json');
        return request.get('/films')
        .then(res => {
            const films = res.body;
            films1 = films[0];
            assert.deepEqual(films.length, filmsData.length);
        });
    });


    it('GET by ID gets by ID', () => {
        const bigLebowskiId = films1._id;
        console.log(bigLebowskiId);
        return request.get(`/films/${bigLebowskiId}`)
        .then(res => {
            const lebowski = res.body;
            assert.equal(lebowski.title, 'The Big Lebowski');
        });
    });

    it('saves a new film to database', () => {
        seventhSon = {
        "title":  "Seventh Son",
        "studio": films1.studio,
        "released": "6-3-1998",
        "actors": films1.actors,
        "reviews": [{
            "rating": 5,
            "review": "A hilariously clever romp with fine performances and great pacing"
        }]
    }
        return saveFilm(seventhSon)
            .then(savedFilm => {
                assert.isDefined(savedFilm._id, 'the id is not undefined');
                seventhSon._id = savedFilm._id;
                seventhSon.__v = 0;
                //Can't deep equal objects because the review is assigned a mongo id
                assert.equal(savedFilm.title, seventhSon.title);
                assert.deepEqual(savedFilm.actors, seventhSon.actors);
            });
    });
});
