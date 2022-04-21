const express = require("express");
const app = express(); //abstraction for API calls
const cors = require("cors"); //for security purposes
const pool = require("./db"); //local postgres database (see db.js for configuration)

//middle ware
app.use(cors());
app.use(express.json()); //request the body to get json data from client side

//req = request from client
//res = response to client

//**The following are hard coded function calls (requests from clients)
//for querying data from the database ***

//adds new hiker to the database/*
app.post("/hikers", async (req, res) => {
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

//get all hikers from database
app.get("/hikers", async (req, res) => {
    try {
        const allhikers = await pool.query("SELECT * FROM hiker");
        res.json(allhikers.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

//rest call to get hiker from the list based on their id
app.get("/hikers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const hiker = await pool.query("SELECT * FROM hiker WHERE hiker_userid = $1", [id]);
        res.json(hiker.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
});

//delete a hiker from database
app.delete("/hikers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletehiker = await pool.query("DELETE FROM hiker WHERE hiker_userid = $1", [id]);
        res.json("Hiker from list was deleted");
    }
    catch (err) {
        console.error(err.message);
    }
});


// Allows you to set port in the project properties.
app.listen(5000, () => {
    console.log("server has started on port 5000");
});
