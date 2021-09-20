const expressAsyncHandler  = require("express-async-handler");
const express = require("express");
const User = require("../models/User");
const logger = require('../logger');





let userRoute = express.Router();

// Store New record of data
userRoute.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const { userId } = req.body;
        logger.info(`transaction started - /api/user/register - userId = ${userId}`)
        const user = await User.findOne({ userId: userId });
        

        if (user) {
            /** If user exists match password */
            res.status(403);
            throw new Error(JSON.stringify({
                "user":"user with same user id already exists"
            }))
            
            
        } else {
            /**if user not exists create new user */
            const user = await User.create(req.body);
            logger.info("New user created successfully.")
            logger.info(JSON.stringify(user))
            res.status(200);
            res.json(user);
            logger.info(`transaction successful - /api/user/register - userId = ${userId}`)
            logger.info('----------------------- success response ---------------------------------')
        }
    })
);

module.exports = userRoute;