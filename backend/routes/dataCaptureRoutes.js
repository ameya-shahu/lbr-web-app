const expressAsyncHandler  = require("express-async-handler");
const express = require("express");
const calCumScore = require("../logics/calCumScore");
const RoundwiseData = require("../models/roundwiseData");



let dataCaptureRoute = express.Router();

// Store New record of data
dataCaptureRoute.post(
    '/senddata',
    expressAsyncHandler( async (req,res)=>{
        console.log(calCumScore(2,3));
        res.json({
            userid:23,
            CumlativeScore: 45,
            lastRound: 56,
            lastSliderValue: 78
        })
    })
);

module.exports = dataCaptureRoute;