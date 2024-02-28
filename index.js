const express = require('express');

const app = express()

const port_number = 4000;

const { MongoClient, ServerApiVersion } = require('mongodb');


// MongoDB Atlass connection via driver and a string connection
const uri = "mongodb+srv://remokhin:ZEyFwyLiYblWpPbi@cluster0.ycugdte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } 

    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

}
run().catch(console.dir);





// Middleware
app.use(express.json());






//



const userRoute = require('./routers/userRoute')
app.use('/api', userRoute);


app.listen(port_number, () => {
    console.log(`Server is running on http://localhost:${port_number}`);

});
