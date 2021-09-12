const express = require('express')
const dotenv = require('dotenv')


dotenv.config();

const app = express();

// database connection
require('./config/dbConnect')();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`${new Date()} --  Backend server is running on port no ${PORT}`)
});


