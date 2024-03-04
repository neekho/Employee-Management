const Employee = require('../models/Employee')


module.exports.createEmployee = (req, res) => {

    let newEmployee = new Employee({

        firstName: req.body.firstName,

        lastName: req.body.lastName,

        contactNumber: req.body.contactNumber,

        position: req.body.position,

        active: req.body.active !== undefined ? req.body.active : true,

        // user: req.body.user,

    });

    console.log(newEmployee);

    // Save the new employee to the database
    newEmployee.save()
        .then(savedEmployee => {
            res.status(201).json(savedEmployee);
        })
        .catch(error => {
            res.status(500).json({ error: error });
        });

};




module.exports.employees = (req, res) => {

    // Employee.find({ active: true })
    // .populate('user', 'email password role') // Populate the 'user' field with the specified fields
    // .exec()
    // .then(result => res.send(result))
    // .catch(error => res.send(error));


    
    Employee.find({ active: true })
    .then(result => res.send(result))
    .catch(error => res.send(error));

};



module.exports.archiveEmployee = (req , res) => {

    const employeeID = req.params.id;

    console.log(employeeID);

    let update = {active: false};

    Employee.findByIdAndUpdate(employeeID, update, {new: true})
    .then(result => res.send(result))
    .catch(error => res.send(error))

    console.log('employee archived');

};