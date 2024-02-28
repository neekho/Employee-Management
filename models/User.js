const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userDocument = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "email is required"]
    },

    password: {
        type: String,
        required: [true, "password is required"]
    },

    password: {
        type: String,
        required: [true, "role is required"]
    },



});

// Hash the password before saving it to the database
userDocument.pre('save', async function(next) {
    // Check if the password is modified or if it's a new user
    if (!this.isModified('password')) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // Replace the plain password with the hashed one
        this.password = hashedPassword;

        next();
    } catch (error) {
        next(error);
    }
});

// Custom method to compare passwords during login
userDocument.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', userDocument);

module.exports = User;