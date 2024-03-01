require('dotenv').config();

const express = require('express');

const app = express();

const port_number = 4000;

const jwt = require('jsonwebtoken');

// PORT 3000 - auth server
// PORT 4000 - management server










// Middleware
app.use(express.json());


// This will check or verify the bearer token of a signed in user?
// the token was generate by generateAccessToken(payload) in authServer.js
// if the authentication failed, the request wont go through it will send a 401 unauthorized
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user


    //   console.log(user)

    //   console.log('\n\n\n');

    //   console.log(req.user)

      next()
    })
  }





// End Middleware



const employees = [
    {

        created_by: "john.doe@example.com",
        username: 'Kyle',
        title: 'Post 1'
    },


    {
        created_by: "john.doe@example.com",
        username: 'Jim',
        title: 'Post 2'
    },

    
    {
        created_by: "hamilton.doe@example.com",
        username: 'Jim',
        title: 'Post 2'
    }


]



app.get('/employees', authenticateToken, (req, res) => {
    console.log('TEST');

    const createdBy = req.user.email;
    console.log(req.user);

    const userEmployees = employees.filter(employee => employee.created_by === createdBy);

    res.status(200).json(userEmployees);
})



// Routes

const userRoute = require('./routers/userRoute')
app.use('/api', userRoute);


// End Routes





app.listen(port_number, () => {
    console.log(`Server is running on http://localhost:${port_number}`);

});
