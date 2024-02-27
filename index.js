const express = require('express');

const app = express()

const port_number = 4000;




// Middleware

app.use(express.json());





//



const userRoute = require('./routers/userRoute')
app.use('/api', userRoute);


app.listen(port_number, () => {
    console.log(`Server is running on http://localhost:${port_number}`);

});
