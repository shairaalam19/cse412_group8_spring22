const Pool = require("pg").Pool;

//local host only
const pool = new Pool({
    // set environmental variables (.env file)
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
});

module.exports = pool;
