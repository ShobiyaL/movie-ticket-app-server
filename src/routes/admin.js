const express = require('express');
const router = express.Router();


const createMovieController = require('../controllers/admin/movie/CreateMovieController');
 const CreateCinemaController = require('../controllers/admin/cinema/CreateCinemaController')

router.post('/movie/create-movie',createMovieController);

router.post('/cinema/create-cinema',CreateCinemaController);

module.exports = router;