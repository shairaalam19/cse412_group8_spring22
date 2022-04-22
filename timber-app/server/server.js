// ****** TO START this SERVER RUN 'node server' on the command line *********

require("dotenv").config();
const express = require("express"); 
const app = express();
const cors = require("cors"); //for security purposes
const pool = require("./db"); //local postgres database (see db.js for configuration)
const port = process.env.PORT || 5000;

app.listen(port, () => { //server listens on this port
    console.log("server has started on port " + port);
});

//MIDDLEWARE (function that handles request from client before giving to route handler)
app.use(cors());
app.use(express.json());

//EXPRESS ROUTES / CRUD OPERATIONS
//req = request from client, res = response to client

// ________________________________________  Hiker routes  ___________________________________________________
// Use : http://localhost:5000/api/hikers

//get all hikers
app.get("/api/hikers", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM hiker");
                res.status(200).json({
            status:"success",
            results: result.rows.length, //get total number of results
            data: {
                hikers: result.rows,
            },
        });
    }
    catch (err) {
        console.error(err.message);
    }
});
//get one hiker based on ID
app.get("/api/hikers/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM hiker WHERE hiker_userid = $1", [req.params.id]); //TIP: ALWAYS USE THIS STRING FORMAT. NEVER USE STRING CONCATENATION OF ANY KIND.
        res.status(200).json({
            status:"success",
            data: {
                hiker: result.rows[0],
            },
        });
    }
    catch (err) {
        console.error(err.message);
    }
});
//add one new hiker to the database
app.post("/api/hikers", async (req, res) => {
    console.log(req.body);
    try { //TIP: returning * = returns entire hiker object
        const result = await pool.query("INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) VALUES($1, $2, $3, $4) RETURNING *", [req.body.hiker_userid, req.body.hiker_username, req.body.hiker_password, req.body.hiker_state]);
        res.status(200).json({
            status:"success",
            data: {
                hiker: result.rows[0],
             },
         });
    } catch (err) {
        console.error(err.message);
    }
});
//update hiker's state based on id
app.put("/api/hikers/state/:id", async (req, res) => {
    console.log(req.body);
    try {
        const result = await pool.query("UPDATE hiker SET hiker_state = $1 WHERE hiker_userid = $2 RETURNING *", [req.body.hiker_state, req.params.id]);
        res.status(200).json({
            status:"success",
            data: {
                hiker: result.rows[0],
             },
         });
    } catch (err) {
        console.error(err.message);
    }
});
//delete a hiker
app.delete("/api/hikers/:id", async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM hiker WHERE hiker_userid = $1", [req.params.id]);
        res.status(200).json({
            status:"successfully deleted"
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

// ________________________________________  Destination routes ___________________________________________________
// Use : http://localhost:5000/api/destinations

//get all destinations from database
app.get("/api/destinations", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM destination");
                res.status(200).json({
            status:"success",
            results: result.rows.length, //get total number of results
            data: {
                destinations: result.rows,
            },
        });
    }
    catch (err) {
        console.error(err.message);
    }
});
//add one new destination to the database
app.post("/api/destinations", async (req, res) => {
    console.log(req.body);
    try {
        const result = await pool.query("INSERT INTO destination(destination_name) VALUES($1) RETURNING *", [req.body.destination_name]);
        res.status(200).json({
            status:"success",
            data: {
                destination: result.rows[0],
             },
         });
    } catch (err) {
        console.error(err.message);
    }
});
//delete a destination
app.delete("/api/destinations/:name", async (req, res) => { //TIP: URLS do not contain spaces. Pass in destination without a space.
    try {
        const result = await pool.query("DELETE FROM destination WHERE destination_name = $1", [req.params.name]);
        res.status(200).json({
            status:"successfully deleted"
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

// ________________________________________  Favorites routes ___________________________________________________
// Use : http://localhost:5000/api/favorites

//get favorite destination(s) of a user based on user ID
app.get("/api/favorites/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT favorites.destination_name FROM favorites WHERE favorites.hiker_userid = $1", [req.params.id]);
                res.status(200).json({
            status:"success",
            results: result.rows.length, //get total number of favorite destination
            data: {
                favorites: result.rows,
            },
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

//Add one new favorite destination under user id (both id and destination MUST exist to add to this table)
app.post("/api/favorites/", async (req, res) => {
    console.log(req.body);
    try {
        const result = await pool.query("INSERT INTO favorites(hiker_userid, destination_name) values($1, $2) RETURNING *", [req.body.hiker_userid, req.body.destination_name]);
        res.status(200).json({
            status:"success",
            data: {
                favorite: result.rows[0],
             },
         });
    } catch (err) {
        console.error(err.message);
    }
});

//delete favorite destination from user
// app.delete("/api/destinations/:id/:dest", async (req, res) => {
//     try { //sample query: DELETE from favorites WHERE destination_name='Grand Canyon' AND hiker_userid=99;
//         const result = await pool.query("DELETE FROM favorites WHERE destination_name = $1 AND hiker_userid= $2", [req.params.id, req.params.dest]);
//         res.status(200).json({
//             status:"successfully deleted"
//         });
//     }
//     catch (err) {
//         console.error(err.message);
//     }
// });


















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

