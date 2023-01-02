const express = require('express');
const router = express.Router();


const createMovieController = require('../controllers/admin/movie/CreateMovieController');

router.post('/movie/create-movie',createMovieController);

module.exports = router;