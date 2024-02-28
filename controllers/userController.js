require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/User')
const Employee = require('../models/Employee')


// john.doe@example.com
// adminexample@

module.exports.test = (req, res) => {
    res.send('Test');
};




module.exports.login = async (req, res) => {
    try {

        const {email, password} = req.body;

        // Find the user based on the email
        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(404).json({message: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({message: 'Invalid password' });
        }

        // If the password matches, you can send the user information
        const accessToken = jwt.sign({ userId: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET);
        res.json(accessToken);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error', error });
    }
}





    

    