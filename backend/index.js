require('dotenv').config();

const express = require('express');

const app = express();

const port_number = 4000;

const jwt = require('jsonwebtoken');

// PORT 3000 - auth server
// PORT 4000 - management server


// Middleware

// This will check or verify the bearer token of a signed in user?
// the token was generate by generateAccessToken(payload) in authServer.js
// if the authentication failed, the request wont go through it will send a 401 unauthorized
const authenticateToken = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        
        console.log(err);
        console.log('err above me')

        if (err) return res.sendStatus(403);
        
        req.user = user;
        
        
        //   console.log(user)
        
        //   console.log('\n\n\n');
        
        //   console.log(req.user)
        
        next()
    })
}



app.use(express.json());
app.use(authenticateToken);

// End Middleware





// Routes

const userRoute = require('./routers/userRoute');
app.use('/user', userRoute);

const employeeRoute = require('./routers/employeeRoute');
app.use('/emp', authenticateToken, employeeRoute);



// End Routes





app.listen(port_number, () => {
    console.log(`Server is running on http://localhost:${port_number}`);
    
});



// Export middleware authenticateToken
module.exports = { authenticateToken };
