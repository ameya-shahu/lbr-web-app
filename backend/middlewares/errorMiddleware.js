const logger = require("../logger");

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


const errorMiddleware = (err, req, res, next) =>{
    logger.error("---------------------- new request error -------------------------------")
    logger.error(JSON.stringify(req.body))
    logger.error(err.name + err.message);
    if(err.name==="ValidationError"){
        let errors = {
            "errors":{}
        };

      Object.keys(err.errors).forEach((key) => {
        errors.errors[key] = err.errors[key].message;
      });
      
      res.status(400).json(errors);
    }else if(err.name==="Error"){
        const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(errorStatusCode);
        res.json({
            "errors": isJson(err.message) ? JSON.parse(err.message) : err.message,
        });
    }
    logger.error("------------------------ error response --------------------------------");
};

module.exports = { errorMiddleware };