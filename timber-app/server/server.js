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
            size: result.rows.length, //total aray size
            hikers: result.rows,
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
            hiker: result.rows[0]
        });
    }
    catch (err) {
        console.error(err.message);
    }
});
//add one new hiker to the database
app.post("/api/hikers", async (req, res) => {
    try { //TIP: returning * = returns entire hiker object
        const result = await pool.query("INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) VALUES($1, $2, $3, $4) RETURNING *", [req.body.hiker_userid, req.body.hiker_username, req.body.hiker_password, req.body.hiker_state]);
        res.status(200).json({
            status:"success",
            hiker: result.rows[0],
         });
    } catch (err) {
        console.error(err.message);
    }
});
//update hiker's state based on id
app.put("/api/hikers/state/:id", async (req, res) => {
    try {
        const result = await pool.query("UPDATE hiker SET hiker_state = $1 WHERE hiker_userid = $2 RETURNING *", [req.body.hiker_state, req.params.id]);
        res.status(200).json({
            status:"success",
            hiker: result.rows[0],
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
            size: result.rows.length, //total array size
            destinations: result.rows,
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

//add one new destination to the database
app.post("/api/destinations", async (req, res) => {
    try {
        const result = await pool.query("INSERT INTO destination(destination_name) VALUES($1) RETURNING *", [req.body.destination_name]);
        res.status(200).json({
            status:"success",
            destination: result.rows[0]
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

//get favorites table
app.get("/api/favorites", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM favorites");
        res.status(200).json({
            status:"success",
            size: result.rows.length, //total aray size
            favorites: result.rows
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

//get favorite destination(s) of a user based on user ID
app.get("/api/favorites/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT favorites.destination_name FROM favorites WHERE favorites.hiker_userid = $1", [req.params.id]);
                res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            favorites: result.rows,
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

//Add one new favorite destination under user id (both id and destination MUST exist to add to this table)
app.post("/api/favorites/", async (req, res) => {
    try {
        const result = await pool.query("INSERT INTO favorites(hiker_userid, destination_name) values($1, $2) RETURNING *", [req.body.hiker_userid, req.body.destination_name]);
        res.status(200).json({
            status:"success",
            favorite: result.rows[0],
         });
    } catch (err) {
        console.error(err.message);
    }
});

//delete favorite destination from user TIP: delete key does NOT contain a json body
app.delete("/api/favorites/:id&:dest", async (req, res) => {
    try { //sample query: DELETE from favorites WHERE destination_name='Grand Canyon' AND hiker_userid=99;
        const result = await pool.query("DELETE FROM favorites WHERE hiker_userid= $1 AND destination_name = $2", [req.params.id, req.params.dest]);
        res.status(200).json({
            status:"successfully deleted"
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

//get favorite destination(s) of a user based on user ID
app.get("/api/favorites/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT favorites.destination_name FROM favorites WHERE favorites.hiker_userid = $1", [req.params.id]);
                res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            favorites: result.rows,
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

// --------------- More complex, but useful queries for sort and filtering --------------------

//find all destinations that have a similar destination name (input)
//example: http://localhost:5000/api/destinations/search/?destination_name=ja
app.get("/api/destinations/search", async (req, res)=> {
    try{
        const { destination_name } = req.query;
        const result = await pool.query("SELECT * FROM destination WHERE destination_name ILIKE $1", [`%${destination_name}%`])
        res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            destinations: result.rows
        });
    }catch(err){
        console.error(err.message);
    }
});

//find all trails that belong to a similar destination name (input)
//url: http://localhost:5000/api/trails/search/?destination_name=gr
app.get("/api/trails/search/", async (req, res)=> {
    try{
        const { destination_name } = req.query;
        const result = await pool.query("SELECT trail_name FROM has_trail WHERE destination_name ILIKE $1", [`%${destination_name}%`])
        res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            trails: result.rows
        });
    }catch(err){
        console.error(err.message);
    }
});

//find all trail details that belong to a destination name (input)
//url: http://localhost:5000/api/trail_details/?val=gr
app.get("/api/trail_details/", async (req, res)=> {
    try{
        const { val } = req.query;
        const result = await pool.query("SELECT * FROM trail WHERE trail.trail_name = $1", [val])
        res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            trails: result.rows
        });
    }catch(err){
        console.error(err.message);
    }
});

//find all trails filtered by length , difficulty, and elevation gain
//url: http://localhost:5000/api/trails/search/filter/?minLength=0&maxLength=9999&difficulty=easy&minGain=0&maxGain=9999&orderBy=trail_name
app.get("/api/trails/search/filterall", async (req, res)=> {
    try{ 
        const { minLength, maxLength, difficulty, minGain, maxGain, orderBy } = req.query;
        const result = await pool.query("SELECT trail_name, trail_length, trail_difficulty, trail_elevationgain FROM trail WHERE trail_length > $1 AND trail_length < $2 AND trail_difficulty = $3 AND trail_elevationgain>$4 AND trail_elevationgain<$5 ORDER BY $6 ASC", [minLength,maxLength, difficulty, minGain,maxGain,orderBy]);
        res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            trails: result.rows
        });
    }catch(err){
        console.error(err.message);
    }
});

//Find a destination nearby based on the user's state (input=id)
//url: http://localhost:5000/api/destinations/hometown/1
app.get("/api/destination/hometown/:id", async (req, res)=> {
    try{
        const result = await pool.query("select hiker_state, destination.destination_name from destination, hiker, location, is_located where destination.destination_name=is_located.destination_name AND is_located.location_coordinate = location.location_coordinate AND location.location_state = hiker.hiker_state AND hiker_userid = $1;", [req.params.id])
        res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            destinations_nearby: result.rows
        });
    }catch(err){
        console.error(err.message);
    }
});


//Find a destination filtered by state
//url: http://localhost:5000/api/destinations/search/filter/state/?val=AZ
app.get("/api/destinations/search/filter/state", async (req, res)=> {
    try{    //type being either by state, city, zipcode
        const {val} = req.query;
        const result = await pool.query("select destination.destination_name from destination, location, is_located where destination.destination_name=is_located.destination_name AND is_located.location_coordinate = location.location_coordinate AND location_state=$1;", [val])
        res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            destinations: result.rows
        });
    }catch(err){
        console.error(err.message);
    }
});

//Find a destionation filtered by zip code
//url: http://localhost:5000/api/destinations/search/filter/zipcode/?val=85233
app.get("/api/destinations/search/filter/zipcode", async (req, res)=> {
    try{    //type being either by state, city, zipcode
        const {val} = req.query;
        const result = await pool.query("select destination.destination_name from destination, location, is_located where destination.destination_name=is_located.destination_name AND is_located.location_coordinate = location.location_coordinate AND location_zipcode=$1;", [val])
        res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            destinations: result.rows
        });
    }catch(err){
        console.error(err.message);
    }
});

//Find accessibility by trail name
//url: http://localhost:5000/api/trails/accessibility/?val=Hermit Trail
app.get("/api/trails/accessibility", async (req, res)=> {
    try{    
        const {val} = req.query; //get trail_name
        const result = await pool.query("select * from accessibility where trail_name=$1;", [val])
        res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            accessibility: result.rows
        });
    }catch(err){
        console.error(err.message);
    }
});

//Find climate by location
////url: http://localhost:5000/api/locations/climate/?val={location_coordinate}
app.get("/api/locations/climate", async (req, res)=> {
    try{    
        const {val} = req.query; //get location_coordinate
        const result = await pool.query("select * from climate where location_coordinate=$1;", [val])
        res.status(200).json({
            status:"success",
            size: result.rows.length, //total array size
            climate: result.rows
        });
    }catch(err){
        console.error(err.message);
    }
});

//add ONLY new trail name to the database
app.post("/api/trails", async (req, res) => {
    try { //TIP: returning * = returns entire hiker object
        const result = await pool.query("INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) VALUES ($1, null,null,null,null) RETURNING *", [req.body.trail_name]);
        res.status(200).json({
            status:"success",
            hiker: result.rows[0],
         });
    } catch (err) {
        console.error(err.message);
    }
});

//add new trail based on destination name
app.post("/api/newtrails/", async (req, res) => {
    try{
        const result = await pool.query("INSERT INTO has_trail(trail_name, destination_name) VALUES ($1,$2) RETURNING *", [req.body.trail_name, req.body.destination_name]);
        res.status(200).json({
            status:"success",
            hiker: result.rows[0],
         });
    }catch(err){
        console.error(err.message);
    }
});

//finds location address based on the destination name
app.get("/api/location/address", async (req, res)=> {
    try{    //type being either by state, city, zipcode
        const {val} = req.query;
        const result = await pool.query("select location.location_address, location.location_coordinate from destination, location, is_located where destination.destination_name=is_located.destination_name AND is_located.location_coordinate = location.location_coordinate AND is_located.destination_name=$1", [val])
        res.status(200).json({
            status:"success",
            location: result.rows
        });
    }catch(err){
        console.error(err.message);
    }
});

//get one destination from database
//http://localhost:5000/api/destinations/search/one/?val=Grand
app.get("/api/destinations/search/one", async (req, res) => {
    try {
        const{val}=req.query;
        const result = await pool.query("SELECT destination_name FROM destination WHERE destination_name = $1", [val]);
            res.status(200).json({
            status:"success",
            destinations: result.rows
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

//verify if user is in the database based on username and password
//http://localhost:5000/api/hikers/verify/?username=abc&?password=abcpw
app.get("/api/hikers/verify/login/", async (req, res) => {
    try {
        const{ username, password }=req.query;
        const result = await pool.query("SELECT * FROM hiker WHERE hiker_username = $1 AND hiker_password = $2", [username, password]);
            res.status(200).json({
            status:"success",
            size: result.rows.length,
            hiker: result.rows
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

//verify if user is in the database based on username and password
//http://localhost:5000/api/favorites/verify/this/?userid=1&dname=Grand Canyon
app.get("/api/favorites/verify/this", async (req, res) => {
    try {
        const{ userid, dname }=req.query;
        const result = await pool.query("SELECT * FROM favorites WHERE hiker_userid = $1 AND destination_name = $2", [userid, dname]);
            res.status(200).json({
            status:"success",
            size: result.rows.length,
            favorites: result.rows
        });
    }
    catch (err) {
        console.error(err.message);
    }
});


//ADD NEW DESTINATION :: http://localhost:5000/api/insert/destination/here/?dname=New Destination
app.get("/api/insert/destination/here", async (req, res) => {
    try {
        const{ dname }=req.query;
        const result = await pool.query("INSERT INTO destination(destination_name) VALUES ($1) RETURNING *", [dname]);
            res.status(200).json({
            status:"success",
            data: result.rows[0]
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

//ADD NEW TRAIL :: http://localhost:5000/api/insert/trail/here/?name=t&length=1&hours=1&difficulty=easy&gain=100
app.get("/api/insert/trail/here", async (req, res) => {
    try {
        const{ name, length, hours, difficulty, gain }=req.query;
        const result = await pool.query("INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) VALUES ($1,$2,$3,$4,$5) RETURNING *", [name, length, hours, difficulty, gain]);
            res.status(200).json({
            status:"success",
            data: result.rows[0]
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

//ADD NEW ACCESSIBILITY :: http://localhost:5000/api/insert/accessibility/here/?tname=New Trail&pet=Yes&park=20
app.get("/api/insert/accessibility/here", async (req, res) => {
    try {
        const{ tname, pet, park }=req.query;
        const result = await pool.query("INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ($1,$2,$3) RETURNING *", [tname, pet, park]);
            res.status(200).json({
            status:"success",
            data: result.rows[0]
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

//ADD NEW LOCATION :: http://localhost:5000/api/insert/location/here/?coordinate=(0,1)&state=AZ&city=Gilbert&zipcode=85233&address=123 Duck St
app.get("/api/insert/location/here", async (req, res) => {
    try {
        const{ coordinate, state, city, zipcode, address }=req.query;
        const result = await pool.query("INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) VALUES ($1,$2,$3,$4,$5) RETURNING *", [coordinate, state, city, zipcode, address]);
            res.status(200).json({
            status:"success",
            data: result.rows[0]
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

// //ADD NEW IS_LOCATION :: http://localhost:5000/api/insert/is_located/here/?name=destination_name&coordinate=location_coordinate
// app.get("/api/insert/is_located/here", async (req, res) => {
//     try {
//         const{ name, coordinate }=req.query;
//         const result = await pool.query("INSERT INTO is_located(destination_name,location_coordinate) VALUES ($1, $2) RETURNING *", [name, coordinate]);
//             res.status(200).json({
//             status:"success",
//             data: result.rows[0]
//         });
//     }
//     catch (err) {
//         console.error(err.message);
//     }
// });

//ADD NEW CLIMATE :: http://localhost:5000/api/insert/climate/here/?coordinate=(1,1)&season=summer&temp=100
app.get("/api/insert/climate/here", async (req, res) => {
    try {
        const{ coordinate, season, temp }=req.query;
        const result = await pool.query("INSERT INTO climate(location_coordinate,climate_season,climate_temp) VALUES ($1,$2,$3) RETURNING *", [coordinate, season, temp]);
            res.status(200).json({
            status:"success",
            data: result.rows[0]
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

