const Employee = require('../models/Employee')


module.exports.createEmployee = (req, res) => {

    let newEmployee = new Employee({

        firstName: req.body.firstName,

        lastName: req.body.lastName,

        contactNumber: req.body.contactNumber,

        position: req.body.position,

        active: req.body.active !== undefined ? req.body.active : true,

        user: req.body.user,

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
    res.send('gzdfgdrfg');
};