const express = require('express');

const router = express.Router();

const employeeController = require('../controllers/employeeController')

// const { authenticateToken } = require('../index');



router.get('/employees', employeeController.employees);


// router.post('/login', userController.login);


module.exports = router;

