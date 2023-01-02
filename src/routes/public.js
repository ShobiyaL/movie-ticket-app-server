const express = require('express')

const router = express.Router();

const SignUpController = require("../controllers/public/SignUpController");
const SignInController =require("../controllers/public/SignInController");

const GetAllMoviesController = require('../controllers/public/GetAllMoviesController')


router.post('/sign-up', SignUpController);

router.post('/sign-in', SignInController);

router.get('/movie/get-allMovies',GetAllMoviesController);

module.exports = router;