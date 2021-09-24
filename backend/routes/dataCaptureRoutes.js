const expressAsyncHandler  = require("express-async-handler");
const express = require("express");
const RoundwiseData = require("../models/roundwiseData");
const getChangeInScore = require("../logics/calCumScore");
const User = require("../models/User");

const config = require("../config/config")();
const logger = require('../logger');
const getHiddenProbability = require("../logics/hiddenProbability");
const getDisplayRingColor = require("../logics/displayRingColor");



let dataCaptureRoute = express.Router();

// Store New record of data
dataCaptureRoute.post(
    '/senddata',
    expressAsyncHandler( async (req,res)=>{
        const {userId, roundNo} = req.body;

        logger.info(`transaction started - /api/data/senddata - userId = ${userId}, roundNo = ${roundNo}`);

        /* store data of round in database*/

        /*first calculate hiddenProb,ringColor then used that for cumlativeScore calculation, and store data with previous ring color, also need to add future ring color*/ 
        try{
            var sliderValueInUniform = req.body.sliderValue/100
            var nextHiddenProb = getHiddenProbability(req.body.hiddenProb);
            var nextRingColor = getDisplayRingColor(nextHiddenProb);
            logger.info(`nextHiddenProbability= ${nextHiddenProb}, nextRingColor = ${nextRingColor}`)

            var changedInScore = getChangeInScore(sliderValueInUniform, nextRingColor);
            logger.info(req.body.CumlativeScore);
            var cumlativeScore = parseFloat(req.body.CumlativeScore) + changedInScore
            logger.info(`ChangedInScore= ${changedInScore}, cumlativeScore = ${cumlativeScore}`);

            var thisRoundData = {
                userId: req.body.userId,
                roundNo: req.body.roundNo,
                screenTime: req.body.screenTime, 
                sliderValue: req.body.sliderValue, 
                currHiddenProb: req.body.hiddenProb, 
                currRingColor: req.body.ringColor,
                nextHiddenProb: nextHiddenProb,
                nextRingColor: nextRingColor,
                cumlativeScore: cumlativeScore, 
                changedInScore: changedInScore,
                
            }
            const roundData = await RoundwiseData.create(thisRoundData);
            logger.info("New roundData created successfully.")
            logger.info(JSON.stringify(roundData))

        }catch(error){
            res.status(500);
                throw new Error(JSON.stringify({
                    "roundData": error.message
            }))
        }

        /*update lastCompleted round in user collection*/
        logger.info("trying to update lastCompletedRound in user.")
        try{
            const user = await User.findOneAndUpdate({userId:userId},{lastCompletedRound:roundNo},{new:true})
            logger.info("updated lastCompletedRound in user.");
            logger.info(user);
        }catch(error){
            res.status(500);
                throw new Error(JSON.stringify({
                    "roundData": error.message
            }))
        }
        
        /* processing for response to client*/
        logger.info("Processing response for client")
        if(roundNo == config.noOfRound){
            logger.info("This was users last round")
            let response = {
                completed: true,
                cumlativeScore: thisRoundData.cumlativeScore,
                changedInCumlative: thisRoundData.changedInScore
            }
            res.json(response);

            logger.info('Response to client');
            logger.info(JSON.stringify(response));
        }else{
            try{
                logger.info("user yet to finish all round");
                let response = {
                    userId: thisRoundData.userId,
                    sessionId: thisRoundData.sessionId,
                    lastCompletedRound: thisRoundData.roundNo,
                    lastSliderValue: thisRoundData.sliderValue,
                    hiddenProb: nextHiddenProb,
                    cumlativeScore: thisRoundData.cumlativeScore,
                    changedInCumlative: thisRoundData.changedInScore,
                    ringColor: nextRingColor
                };
                res.json(response)
                logger.info('Response to client');
                logger.info(JSON.stringify(response));

            }catch(error){
                res.status(500);
                throw new Error(JSON.stringify({
                    "roundData": error.message
                }))
            }    
            
        logger.info(`transaction successful - /api/data/senddata - userId = ${userId}, roundNo = ${roundNo}`);
        logger.info('----------------------- success response ---------------------------------');
        }
    })
);

module.exports = dataCaptureRoute;