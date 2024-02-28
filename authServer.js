require('dotenv').config();

const express = require('express');
const app = express();
const config = require('./config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const port_number = 3000;




// Model
const User = require('./models/User');

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });


let db = mongoose.connection;


db.on("error", console.error.bind(console, 'MongoDB error connection'));

db.once("open", () => console.log("Connected to MongoDB"));
app.use(express.json());



app.post('/login', async (req, res) => {

    // Authenticate user

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
        // res.json(user);

        ///////////////////////////
        // to learn
        const accessToken = generateAccessToken({ userId: user._id, email: user.email, role: user.role });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET);

        res.send({accessToken : accessToken, refreshToken: refreshToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error', error });
    }



});


function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}


app.listen(port_number, () => {
    console.log(`Server is running on http://localhost:${port_number}`);

});
