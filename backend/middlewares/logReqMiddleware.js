const logger = require("../logger");

const logReqMiddleware = (req, res, next) =>{
    logger.info("------------------------- new request -----------------------------------");
    logger.info("URL ---" + JSON.stringify(req.url))
    logger.info(JSON.stringify(req.body));
    next();
};

module.exports = logReqMiddleware;