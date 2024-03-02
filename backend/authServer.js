require('dotenv').config();

const express = require('express');
const app = express();
const port_number = 3000;


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');






// Model
const User = require('./models/User');


const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = mongoose.connection;


db.on("error", console.error.bind(console, 'MongoDB error connection'));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());
// app.use(cors);

// Timer for cleaning up stored refresh tokens
const refreshTokenExpirationTime = 5 * 60 * 1000; // 15 minutes in milliseconds


// Schema for storing refresh tokens, associate the refresh tokens to its users
const refreshTokenSchema = new mongoose.Schema({
    userId: { type: String, required: true },

    refreshToken: { type: String, required: true },

    expiresAt: { type: Date, required: true },
});


// Set document
const RefreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema);

function storeRefreshTokenInDatabase(userId, refreshToken) {

    const refreshTokenModel = new RefreshTokenModel({ 
        
        userId, 
        refreshToken,
        expiresAt: new Date(new Date().getTime() + refreshTokenExpirationTime), // Set expiration time
    
    });
    refreshTokenModel.save();
}



async function isRefreshTokenValid(userId, refreshToken) {
    const tokenDocument = await RefreshTokenModel.findOne({ userId, refreshToken });
    return !!tokenDocument;
}

async function removeRefreshTokenFromDatabase(refreshToken) {
    await RefreshTokenModel.deleteOne({ refreshToken });
}











app.post('/token', async (req, res) => {
    const refreshToken = req.body.token;

    if (refreshToken == null) return res.sendStatus(401);

    try {
        // Check if the refresh token exists in the database
        const tokenDocument = await RefreshTokenModel.findOne({ refreshToken });

        if (!tokenDocument) {
            return res.sendStatus(403);
        }

        // Verify the refresh token against the secret
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            // console.log('User Information from Refresh Token:', user);


            // If verification is successful, generate a new access token
            const accessToken = generateAccessToken({ userId: user.userId, email: user.email, role: user.role });
            res.json({ accessToken: accessToken });
        });
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});




app.delete('/logout', async (req, res) => {
    const refreshToken = req.body.token; 
  
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required for logout.' });
    }
    
    try {
        // Remove the refresh token from the database
        await RefreshTokenModel.deleteOne({ refreshToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

    res.sendStatus(204); // Successful logout
  });





app.post('/login', async (req, res) => {

    // Authenticate user

    try {
        const {email, password} = req.body;

        // Find the user based on the email
        const user = await User.findOne({email: email});

        if (email.length == 0|| password.length == 0) {
            return res.status(400).json({message: 'check user input pls' });
        }

        if (!user) {
            return res.status(404).json({message: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({message: 'Invalid password' });
        }

        ///////////////////////////
        // to learn

        // once logged in, give user a access token (for them use on other requests)
        // and a refresh token, for handling access token expiration

        const userPayload = { userId: user._id, email: user.email, role: user.role }; // get user info

        const accessToken = generateAccessToken(userPayload);
        const refreshToken = generateRefreshToken(userPayload);

        // save to db the refresh token
        storeRefreshTokenInDatabase(user._id, refreshToken);

        res.send({accessToken : accessToken, refreshToken: refreshToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error', error });
    }



});


function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '35s' });
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
}




async function removeExpiredRefreshTokens() {
    try {
        const currentDateTime = new Date();

        await RefreshTokenModel.deleteMany({ expiresAt: { $lte: currentDateTime } });

        console.log('Expired refresh tokens removed.');
    } catch (error) {
        console.error('Error removing expired refresh tokens:', error);
    } 
}


setInterval(async () => {
    await removeExpiredRefreshTokens();
}, refreshTokenExpirationTime);





app.listen(port_number, () => {
    console.log(`auth server is running on http://localhost:${port_number}`);

});



