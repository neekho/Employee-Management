require('dotenv').config();

const express = require('express');
const app = express();
const port_number = 3000;


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// Models
const User = require('./models/User');
const Employee = require('./models/Employee');

// Schema for storing refresh tokens, associate the refresh tokens to its users
const RefreshTokenModel = require('./models/RefreshToken');



app.use(express.json());


// Establish MongoDB Atlas connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

let db = mongoose.connection;
db.on("error", console.error.bind(console, 'MongoDB error connection'));
db.once("open", () => console.log("Connected to MongoDB"));





// Timer for cleaning up stored refresh tokens
const refreshTokenExpirationTime = 5 * 60 * 1000; // 15 minutes in milliseconds

function generateAccessToken(payload) {
    // 35 SECONDS EXPIRATION FOR ACCESS TOKENS (FOR DEMO)
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '55s' });
}

function generateRefreshToken(payload) {
    // 5 MIN EXPIRATION FOR REFRESH TOKENS
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
}


function storeRefreshTokenInDatabase(userId, refreshToken) {
    // Associate a user with a refresh token
    // expiresAt sets the removal of the refresh token
    // so that, users wont have infinite access to access token.

    const refreshTokenModel = new RefreshTokenModel({ 
        userId, 
        refreshToken,
        expiresAt: new Date(new Date().getTime() + refreshTokenExpirationTime), // Set expiration time
    
    });
    refreshTokenModel.save();
}



// Generates a new access token, provided the refresh token in the request body.
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

    try {
        const {email, password} = req.body;

        // Find the user based on the email
        const user = await User.findOne({email: email});

        if (email.length == 0|| password.length == 0) {
            return res.status(401).json({message: 'check user input pls' });
        }

        if (!user) {
            return res.status(404).json({message: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({message: 'Invalid password' });
        }

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









// require bearer token
const middleware = require('./middleware');



// Application routes
const userRoute = require('./routers/userRoute');
app.use('/user', middleware.authenticateToken, userRoute);


const employeeRoute = require('./routers/employeeRoute');
app.use('/employee', middleware.authenticateToken, employeeRoute);


















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
    console.log(`server is running on http://localhost:${port_number}`);

});



