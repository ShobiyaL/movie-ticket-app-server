const express = require('express')

const router = express.Router();

const { stripeEventHandler } = require('../controllers/public/CheckOutController')
const SignUpController = require("../controllers/public/SignUpController");
const SignInController =require("../controllers/public/SignInController");

const {GetAllMoviesController,GetSingleMovieController,GetMovieOnSearchController} = require('../controllers/public/MovieController')
const {cinemaByCity,cities,getCinemaById} = require('../controllers/public/CinemaController')

 const {getShowTime,allShowTime,updateShowTime,getShowTimeByMovieId,getShowTimeByCinemaId} = require('../controllers/public/ShowTimeController')

 const { createCheckoutSession } = require('../controllers/public/CheckOutController');
 const {
  createReservation,
  getAllReservations,
  getReservation
} = require('../controllers/public/ReservationController');

router.post('/sign-up', SignUpController);

router.post('/sign-in', SignInController);

router.get('/movie/get-allMovies',GetAllMoviesController);

router.get('/movie/search',GetMovieOnSearchController);

router.get('/movie/:movieid',GetSingleMovieController);

router.get('/cinema/:city',cinemaByCity)

router.get('/cinema/filter/cities',cities) ;

 router.get('/showTime/allShowTime',allShowTime);

  router.get('/showTime/:movieId',getShowTime);

  router.get('/cinema/id/:cinemaid',getCinemaById);

  router.post('/checkout-session', createCheckoutSession);

  router.patch('/showTime/update-showtime/:showTimeId',updateShowTime)
  router.post('/reser/create-reservation', createReservation);
  router.get('/reser/getAll', getAllReservations);
  router.get('/reser/:sessionId',getReservation);
 
  router.post('/stripe/webhook', express.raw({ type: 'application/json' }), stripeEventHandler)

//  router.get ('/showTime/:movieId',getShowTimeByMovieId);

// router.get('/showTime/cinema/:cinemaId',getShowTimeByCinemaId)

module.exports = router;