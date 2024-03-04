const express = require('express');

const router = express.Router();

const employeeController = require('../controllers/employeeController')


// create a new employee
router.post('/add', employeeController.createEmployee)

// select all active employees
router.get('/employees', employeeController.employees);


//update employee
router.put('/update/:id', employeeController.updateEmployee);

// soft delete an employee
router.delete('/delete/:id', employeeController.archiveEmployee)



module.exports = router;

