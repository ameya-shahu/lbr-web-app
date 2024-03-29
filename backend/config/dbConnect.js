const mongoose = require('mongoose');
const logger = require('../logger');
const config = require('./config')();



const dbConnect = ()=>{
    const DB_URI = config.db.URI;
    mongoose.set('toJSON', { virtuals: true });
    mongoose.connect(DB_URI, {
        useUnifiedTopology:true,
        useNewUrlParser:true,
    })
    .then(() => logger.info(`Database Connected`))
    .catch(err => console.error(err));
}

module.exports = dbConnect;