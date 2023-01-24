const express = require('express')

const router = express.Router();

const {getUserProfile} = require('../controllers/public/ProfileController');


router.get('/user/profile/',getUserProfile);

module.exports = router;