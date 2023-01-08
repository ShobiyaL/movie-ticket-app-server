const express = require('express')

const router = express.Router();

const SignUpController = require("../controllers/public/SignUpController");
const SignInController =require("../controllers/public/SignInController");

const GetAllMoviesController = require('../controllers/public/GetAllMoviesController')
const GetSingleMovieController = require('../controllers/public/GetSingleMovieController')
const GetMovieOnSearchController = require('../controllers/public/GetMovieOnSearchController')

router.post('/sign-up', SignUpController);

router.post('/sign-in', SignInController);

router.get('/movie/get-allMovies',GetAllMoviesController);

router.get('/search',GetMovieOnSearchController);

router.get('/movie/:movieid',GetSingleMovieController);

module.exports = router;