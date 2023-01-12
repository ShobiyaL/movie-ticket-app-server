const express = require('express');
const router = express.Router();


const createMovieController = require('../controllers/admin/movie/CreateMovieController');
 const CreateCinemaController = require('../controllers/admin/cinema/CreateCinemaController')
const {createShowTime} = require('../controllers/admin/showTime/CreateShowTimeController');

router.post('/movie/create-movie',createMovieController);

router.post('/cinema/create-cinema',CreateCinemaController);

router.post('/showTime/create-showTime',createShowTime);

module.exports = router;