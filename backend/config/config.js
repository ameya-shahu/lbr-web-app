module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
                db:{
                    URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
                },
                pm2:{
                    id: "dev"
                },
                
                noOfRound: process.env.NO_OF_ROUND
            };

        case 'production':
            return {
                db:{
                    URI: `mongodb://${process.env.DB_HOST}/${config.db.database}`
                },
                pm2:{
                    id: process.env.pm_id || 1
                },

                noOfRound: process.env.NO_OF_ROUND,

            };

        default:
            return "wrong enviorment";
    }
};