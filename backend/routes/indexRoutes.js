const expressAsyncHandler  = require("express-async-handler");
const express = require("express");
const logger = require("../logger");

let indexRoute = express.Router();

// Store New record of data
indexRoute.post(
    '/test',
    expressAsyncHandler( async (req,res)=>{
        logger.info(`transaction started - /test`)
        res.status(200);
        res.json({"message" : "Test check OK"})
        logger.info(`transaction successful - /test`);
        logger.info('----------------------- success response ---------------------------------');
    })
    
);

module.exports = indexRoute;