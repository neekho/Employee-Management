const express = require('express');

const app = express()

const port_number = 4000;




app.listen(port_number, () => {
    console.log(`Server is running on http://localhost:${port_number}`);

});
