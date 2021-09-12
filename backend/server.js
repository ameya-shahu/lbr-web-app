// third party packages
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');

// routes
const dataCaptureRoute = require('./routes/dataCaptureRoutes');


dotenv.config();

const app = express();

// database connection
require('./config/dbConnect')();

app.use(cors());
app.use(express.json());

// link routes to express app
app.use('/api/data', dataCaptureRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`${new Date()} --  Backend server is running on port no ${PORT}`)
});


