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

//adds new hiker to the database

//get all hikers from database
app.get("/hikers", async (req, res) => {
    try {
        const allhikers = await pool.query("SELECT * FROM hiker");
        const values = res.json(allhikers.rows);
        return values; 
    }
    catch (err) {
        console.error(err.message);
    }
});


// Allows you to set port in the project properties.
app.listen(5000, () => {
    console.log("server has started on port 5000");
});
