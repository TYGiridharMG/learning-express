const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/register', userController.getUserRegistration);
router.post('/register', userController.postUserRegistration);
router.get('/logout', userController.logout);
router.use('/home', userController.home);

module.exports = router;