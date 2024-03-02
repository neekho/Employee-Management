const express = require('express');

const router = express.Router();

const employeeController = require('../controllers/employeeController')


router.post('/add', employeeController.createEmployee)

router.get('/employees', employeeController.employees);




module.exports = router;

