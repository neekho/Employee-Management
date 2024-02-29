const express = require('express');

const app = express()

const port_number = 4000;


// PORT 3000 - auth server
// PORT 4000 - management server



// MongoDB Atlas connection via driver and a string connection
// connection string is in config, and is not included in commits.
const config = require('./config');

const mongoose = require('mongoose');
// mongoose.set("strictQuery", false);
// mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });


// let db = mongoose.connection;


// db.on("error", console.error.bind(console, 'MongoDB error connection'));

// db.once("open", () => console.log("Connected to MongoDB"));
//








// Middleware
app.use(express.json());






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
    res.json(employees.filter(post => post.created_by === req.user.email))
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

// Routes

const userRoute = require('./routers/userRoute')
app.use('/api', userRoute);


// End Routes











app.listen(port_number, () => {
    console.log(`Server is running on http://localhost:${port_number}`);

});
