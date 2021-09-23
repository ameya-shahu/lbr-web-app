const winston = require('winston');
const config = require('./config/config')();
const { splat, combine, timestamp, printf } = winston.format;


// meta param is ensured by splat()
const myFormat = printf(({ timestamp, level, message, meta }) => {
  return `${timestamp} --- ${level} --- ${message};${meta? JSON.stringify(meta) : ''}`;
});

const options = {
  info: {
    level: 'info',
    filename: `./logs/app-${config.pm2.id}.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  error:{
    level: 'error',
    filename: `./logs/error-${config.pm2.id}.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  debug: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
    format: combine(
        timestamp(),
        splat(),
        myFormat
      ),
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.info),
    new winston.transports.File(options.error),
    new winston.transports.Console(options.debug)
  ],
  exitOnError: false
})

module.exports = logger
module.exports.stream = {
    write: function(message, encoding) {
      logger.info(message);
      console.log('message=', message);
    }
  };