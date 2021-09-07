const expressAsyncHandler  = require("express-async-handler");
const express = require("express");



let dataCaptureRoute = express.Router();

// Store New record of data
dataCaptureRoute.post(
    '/senddata',
    expressAsyncHandler( async (req,res)=>{
        const { userID,roundNo } = req.body;
        const userExist = await User.findOne({email:email})
    })
);
