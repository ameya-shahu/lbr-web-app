const expressAsyncHandler  = require("express-async-handler");
const express = require("express");
const User = require("../models/User");
const logger = require('../logger');
const RoundwiseData = require("../models/roundwiseData");
const getHiddenProbability = require("../logics/hiddenProbability");

let userRoute = express.Router();

userRoute.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const { userId } = req.body;
        logger.info(`transaction started - /api/user/register - userId = ${userId}`)

        logger.info(`transaction started - trying to find user with userId = ${userId}`)
        try{
            var user = await User.findOne({ userId: userId });
        }catch(error){
            res.status(500);
            throw new Error(JSON.stringify({
                "user": error.message
            }))
        }
        

        if (user) {
            /** If user exists check if last round is 1000 or not */
            logger.info(`user has completed ${user.lastCompletedRound} rounds`)
            if(user.lastCompletedRound==1000){
                res.status(403);
                throw new Error(JSON.stringify({
                    "user":"user with same user id already exists and completed with all rounds"
                }))
            }
            else if(user.lastCompletedRound==0){
                logger.info(`user has completed ${user.lastCompletedRound} rounds, hence no previous data`)
                logger.info(`initating from begining`)
                let hiddenProb = parseFloat(Math.random().toFixed(3))  

                let response = {
                    userId: user.userId,
                    sessionId: user.sessionId,
                    lastCompletedRound: 0,
                    lastSliderValue: 50,
                    hiddenProb: hiddenProb,
                    cumlativeScore:0,
                    changedInCumlative:0
                };

                logger.info("Response to client")
                logger.info(JSON.stringify(response))

                res.status(200);
                res.json(response);
            }
            else{
                try{
                    let lastRoundData = await RoundwiseData.findOne({userId:user.userId, roundNo:user.lastCompletedRound})
                    logger.info('last completed round data')
                    logger.info(JSON.stringify(lastRoundData))
                    
                    let response = {
                        userId: lastRoundData.userId,
                        sessionId: user.sessionId,
                        lastCompletedRound: user.lastCompletedRound,
                        lastSliderValue: lastRoundData.sliderValue,
                        hiddenProb: getHiddenProbability(lastRoundData.hiddenProb),
                        cumlativeScore: lastRoundData.cumlativeScore,
                        changedInCumlative: lastRoundData.changedInCumlative
                    };

                    logger.info("response to client");
                    logger.info(JSON.stringify(response));

                    res.status(200);
                    res.json(response);
                }catch(error){
                    res.status(500);
                    throw new Error(JSON.stringify({
                        "user": error.message
                    }))
                }
            }

        } 
        else {
            try{
                /**if user not exists create new user */
                let newUser = {
                    userId: req.body.userId,
                    sessionId: req.body.sessionId,
                    day: req.body.day,
                    enterTime: Date(),
                    lastCompletedRound: 0,
                }
                const user = await User.create(newUser);

                logger.info("New user created successfully.")
                logger.info(JSON.stringify(user))

                let hiddenProb = parseFloat(Math.random().toFixed(3))
                
                let response = {
                    userId: user.userId,
                    sessionId: user.sessionId,
                    lastCompletedRound: 0,
                    lastSliderValue: 50,
                    hiddenProb: hiddenProb,
                    cumlativeScore:0,
                    changedInCumlative:0
                };

                logger.info("Response to client")
                logger.info(JSON.stringify(response))

                res.status(200);
                res.json(response);
            }catch(error){
                res.status(500);
                throw new Error(JSON.stringify({
                    "user": error.message
                }))
            }
        }
        logger.info(`transaction successful - /api/user/register - userId = ${userId}`);
        logger.info('----------------------- success response ---------------------------------');
    })
);

module.exports = userRoute;