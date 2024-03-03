const jwt = require('jsonwebtoken');

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

        if (err) return res.sendStatus(403);
        
        req.user = user;
        
        //   console.log(user)
        //   console.log('\n\n\n');
        //   console.log(req.user)
        
        next()
    })
}




module.exports = { authenticateToken };
