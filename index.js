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



// Routes

const userRoute = require('./routers/userRoute')
app.use('/api', userRoute);


// End Routes











app.listen(port_number, () => {
    console.log(`Server is running on http://localhost:${port_number}`);

});
