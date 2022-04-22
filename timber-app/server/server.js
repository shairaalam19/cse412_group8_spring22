// ****** TO START this SERVER RUN 'node server' on the command line *********

require("dotenv").config();
const express = require("express"); 
const app = express();
const cors = require("cors"); //for security purposes
const pool = require("./db"); //local postgres database (see db.js for configuration)
const port = process.env.PORT || 5000;

app.listen(port, () => { //server listens on this port
    console.log(`server has started on port ${port}`);
});

//MIDDLEWARE (function that handles request from client before giving to route handler)
app.use(cors());
app.use(express.json());

//EXPRESS ROUTES / CRUD OPERATIONS
//req = request from client, res = response to client

// ________________________________________  Hikers operations (select, insert) ___________________________________________________
// Use : http://localhost:5000/api/hikers

//get all hikers
app.get("/api/hikers", async (req, res) => {
    try {
        const allhikers = await pool.query("SELECT * FROM hiker");
        res.json(allhikers.rows); //send response in a json format to client
    }
    catch (err) {
        console.error(err.message);
    }
});

//get one hiker
app.get("/api/hikers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const hiker = await pool.query(`SELECT * FROM hiker WHERE hiker_userid = ${id}`);
        res.json(hiker.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
});

//add one new hiker to the database
app.post("/api/hikers", async (req, res) => {
    try {
        //use queries here
        console.log(req.body);
        const { hiker_userid, hiker_username, hiker_password, hiker_state } = req.body;
        const newhiker = await pool.query("INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) VALUES($1, $2, $3, $4) RETURNING *", [hiker_userid, hiker_username, hiker_password, hiker_state]);
        res.json(newhiker.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// ________________________________________  Destination operations ___________________________________________________
//get all destinations from database
app.get("/api/destinations", async (req, res) => {
    try {
        const alldestination = await pool.query("SELECT * FROM destination");
        res.json(alldestination.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});
























// ---------------------------------------------------------------- HEROKU SET UP ---------------------------------------------------------------------------

// const { Pool } = require('pg');
// let connectionString = {
//     user: "dqmvuesoxhhqlj",
//     database: "dem1qfscenbi0r",
//     host: "ec2-52-203-118-49.compute-1.amazonaws.com"
// }
// const databaseUrl = "postgres://dqmvuesoxhhqlj:6e6df05220f395dff07d25a8d65f697a51d5bc04ff5925c3491dcee7fe987ff5@ec2-52-203-118-49.compute-1.amazonaws.com:5432/dem1qfscenbi0r";
// connectionString = {
//     connectionString: databaseUrl,
//     ssl: true
// };
//const pool = new Pool(connectionString);
//pool.on('connect', () => console.log('connected to db'));

// pool.query('SELECT * FROM hiker;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//         console.log(JSON.stringify(row));
//     }
//     pool.end();
// });

