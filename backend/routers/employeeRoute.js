const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employeeController");

// require token for every routes in this route
const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);

router.get("/employees", employeeController.employees);
// get specific employee
router.get("/:id", employeeController.getEmployee);

// create a new employee
router.post("/add", employeeController.createEmployee);

// select all active employees

//update employee
router.put("/update/:id", employeeController.updateEmployee);

// archive delete an employee
router.delete("/delete/:id", employeeController.archiveEmployee);

module.exports = router;
