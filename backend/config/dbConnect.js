const mongoose = require('mongoose');
const logger = require('../logger');
const config = require('./config')();



const dbConnect = ()=>{
    const DB_URI = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.database}`
    mongoose.set('toJSON', { virtuals: true });
    mongoose.connect(DB_URI, {
        useUnifiedTopology:true,
        useNewUrlParser:true,
    })
    .then(() => logger.info(`${new Date()} -- Database Connected`))
    .catch(err => console.error(err));
}

module.exports = dbConnect;