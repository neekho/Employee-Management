const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController')


router.get('/live', userController.test);

router.get('/attempt', userController.attempt);



module.exports = router;