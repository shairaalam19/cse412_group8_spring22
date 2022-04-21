const Pool = require("pg").Pool;

//configure heroku yyyydatabase with server
//this we will be use to run our query

//*********Heroku database credentials not working***************
/*
const pool = new Pool({
    user: "dqmvuesoxhhqlj",
    password: "6e6df05220f395dff07d25a8d65f697a51d5bc04ff5925c3491dcee7fe987ff5",
    host: "ec2-52-203-118-49.compute-1.amazonaws.com",
    database: "dem1qfscenbi0r",
    port: 5432
    //URI: postgres://dqmvuesoxhhqlj:6e6df05220f395dff07d25a8d65f697a51d5bc04ff5925c3491dcee7fe987ff5@ec2-52-203-118-49.compute-1.amazonaws.com:5432/dem1qfscenbi0r
});*/

//******************using local host temporarily***************************
const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    database: "timberapp",
    port: 5432
});

module.exports = pool;