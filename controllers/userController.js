const User = require('../models/User')
const Employee = require('../models/Employee')

// john.doe@example.com
// adminexample@

module.exports.test = (req, res) => {
    res.send('Test');
};


module.exports.attempt = (req, res) => {
    


    const employeeEmail = req.body.email;
    
    const password = req.body.password;
    
    
    User.find({email: employeeEmail, password: password})
    .then(result => res.send(result))
    .catch(error => res.send(error))
    
}
    