const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player');
const middlewares = require('../middlewares/index');


router.post('/signUp', playerController.signUp);
router.post('/logIn', playerController.logIn);
router.post('/editProfile', middlewares.verifyPlayer, playerController.editProfile);

module.exports = router 