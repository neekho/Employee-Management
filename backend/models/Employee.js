const mongoose = require('mongoose')

const userDocument = require('./User');


const Schema = mongoose.Schema;

const employeeDocument = new Schema({

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
        required: [false, "contact number key"]
    },

    
    position: {
        type: String,
        required: [false, "position key"]
    },

    
    department: {
        type: String,
        required: [false, "department key"]
    },

    active: {
        type: Boolean,
        default: true
    },

    user: { 
        type: Schema.Types.ObjectId, 
        ref: userDocument
    
    }


})


const Employee = mongoose.model('Employee', employeeDocument);
module.exports = Employee;