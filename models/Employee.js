const mongoose = require('mongoose')

const userDocument = require('./User')

const employeeDocument = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "first name is required"]
    },

    lastName: {
        type: String,
        required: [true, "last name is required"]
    },


    
    contactNumber: {
        type: String,
        required: [true, "contact number is required"]
    },

    
    position: {
        type: String,
        required: [false, ""]
    },

    
    department: {
        type: String,
        required: [false, ""]
    },

    user: { 
        type: userDocument, 
        required: true 
    
    }


})


const Employee = mongoose.model('Employee', employeeDocument);
module.exports = Employee;