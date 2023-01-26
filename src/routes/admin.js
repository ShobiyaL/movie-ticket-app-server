const express = require('express');
const router = express.Router();


const {createMovie} = require('../controllers/admin/movie/MovieController');
 const {createCinema,updateCinema} = require('../controllers/admin/cinema/CinemaController');
const {createShowTime} = require('../controllers/admin/showTime/ShowTimeController');

router.post('/movie/create-movie',createMovie);

router.post('/cinema/create-cinema',createCinema);

router.put('/cinema/update/:cinemaId', updateCinema);

router.post('/showTime/create-showTime',createShowTime);

// router.get('/user/profile/:userId',getUserProfile);

module.exports = router;