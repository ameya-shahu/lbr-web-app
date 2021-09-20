// third party packages
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
// routes
const dataCaptureRoute = require('./routes/dataCaptureRoutes');
const userRoute = require('./routes/UserRoutes');
const logger = require('./logger');
const logReqMiddleware = require('./middlewares/logReqMiddleware');




dotenv.config();

const app = express();

// database connection
require('./config/dbConnect')();

app.use(cors());
app.use(express.json());

app.use(logReqMiddleware);
// link routes to express app
app.use('/api/data', dataCaptureRoute);
app.use('/api/user', userRoute);

// errorhandler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    logger.info(`${new Date()} --  Backend server is running on port no ${PORT}`)
});


