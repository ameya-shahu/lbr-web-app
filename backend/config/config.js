module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
                db:{
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    host: process.env.DB_HOST,
                    database: process.env.DB_DATABASE
                },
                pm2:{
                    id: "dev"
                }
            };

        case 'production':
            return {
                db:{
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    host: process.env.DB_HOST,
                    database: process.env.DB_DATABASE
                },
                pm2:{
                    id: process.env.pm_id || 1
                }
            };

        default:
            return "wrong enviorment";
    }
};