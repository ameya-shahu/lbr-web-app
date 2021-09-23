// third party packages
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');

// middleware import
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const logReqMiddleware = require('./middlewares/logReqMiddleware');

// routes
const dataCaptureRoute = require('./routes/dataCaptureRoutes');
const userRoute = require('./routes/UserRoutes');
const indexRoute = require('./routes/indexRoutes');

// utilities
const logger = require('./logger');






dotenv.config();

const app = express();

// database connection
require('./config/dbConnect')();


/*-----Middleware flow-------*/
app.use(cors());
app.use(express.json());
 
//log incomming request
app.use(logReqMiddleware);
// link routes to express app


app.use('/api/data', dataCaptureRoute);
app.use('/api/user', userRoute);
app.use('/', indexRoute);

// errorhandler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    logger.info(`Backend server is running on port no ${PORT}`)
});


