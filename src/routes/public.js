const express = require('express')

const router = express.Router();

const SignUpController = require("../controllers/public/SignUpController");
const SignInController =require("../controllers/public/SignInController");

const GetAllMoviesController = require('../controllers/public/GetAllMoviesController')
const GetSingleMovieController = require('../controllers/public/GetSingleMovieController')
const GetMovieOnSearchController = require('../controllers/public/GetMovieOnSearchController')
const {cinemaByCity,cities} = require('../controllers/public/CinemaController')

 const {getShowTime,allShowTime,getShowTimeByMovieId,getShowTimeByCinemaId} = require('../controllers/public/ShowTimeController')


router.post('/sign-up', SignUpController);

router.post('/sign-in', SignInController);

router.get('/movie/get-allMovies',GetAllMoviesController);

router.get('/search',GetMovieOnSearchController);

router.get('/movie/:movieid',GetSingleMovieController);

router.get('/cinema/:city',cinemaByCity)

router.get('/cinema/filter/cities',cities) ;

 router.get('/showTime/allShowTime',allShowTime);

  router.get('/showTime/:movieId',getShowTime);

//  router.get ('/showTime/:movieId',getShowTimeByMovieId);

// router.get('/showTime/cinema/:cinemaId',getShowTimeByCinemaId)

module.exports = router;