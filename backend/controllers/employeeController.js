const Employee = require("../models/Employee");

module.exports.createEmployee = async (req, res) => {
  const { firstName, lastName, contactNumber, position, department, active } =
    req.body;

  const existingEmployee = await Employee.findOne({
    firstName: firstName,
    lastName: lastName,
  });

  if (existingEmployee) {
    return res
      .status(400)
      .json({ error: "Employee with the same name already exists" });
  }

  // If no existing employee, create a new one
  const newEmployee = new Employee({
    firstName,
    lastName,
    contactNumber,
    position,
    department,
    active: active !== undefined ? active : true,
  });

  // Save the new employee to the database
  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.employees = (req, res) => {
  // Employee.find({ active: true })
  // .populate('user', 'email password role') // Populate the 'user' field with the specified fields
  // .exec()
  // .then(result => res.send(result))
  // .catch(error => res.send(error));

  Employee.find({ active: true })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports.updateEmployee = (req, res) => {
  const { firstName, lastName, contactNumber, position, active } = req.body;

  // router.put('/update/:id', employeeController.updateEmployee);
  // params.id it should match. with our place holder in routers.
  const employeeId = req.params.id;
  // console.log(employeeId);

  const updateFields = {
    firstName,
    lastName,
    contactNumber,
    position,
    active: active !== undefined ? active : true,
  };

  // Use the findByIdAndUpdate method to update the employee
  // Set the new option to true to return the modified document
  Employee.findByIdAndUpdate(employeeId, updateFields, { new: true })
    .then((updatedEmployee) => {
      if (!updatedEmployee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.status(200).json(updatedEmployee);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    });
};

module.exports.archiveEmployee = (req, res) => {
  const employeeID = req.params.id;

  let update = { active: false };

  Employee.findByIdAndUpdate(employeeID, update, { new: true })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));

  console.log("employee archived");
};

module.exports.getEmployee = (req, res) => {
  const employeeID = req.params.id;
  Employee.findById(employeeID)
    .then((result) => res.send(result))
    .catch((error) => {
      if (error.name == "CastError") {
        return res.status(400).send({ error: "Invalid employee ID format" });
      } else {
        return res.status(500).send({ error: "Internal server error" });
      }
    });
};
