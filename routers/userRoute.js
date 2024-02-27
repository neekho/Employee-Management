const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController')


router.get('/live', userController.test);





module.exports = router;