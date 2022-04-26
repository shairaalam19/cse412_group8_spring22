import React, { Fragment, useState } from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import { Button } from './Button';

export function Destination_Cards(props) {
  const [list, setList] = useState({
    destinations: [
      // destination_name: '',
      // trails: '', 
      // accessibility: '',
      // location: '',
      // climate: ''
    ]
  }); 

  function card(destination){
    var trails_string = "Trails: ";
    for(var i = 0; i < destination.trails.length-1; i++){
      trails_string = trails_string + destination.trails[i] + ",\t";
    }
    
    trails_string = trails_string + destination.trails[destination.trails.length-1];

    return (
      <ul className="cards__items">
        <CardItem
          // src="images/img-9.jpg"
          // text="Explore the hidden waterfall deep inside the Amazon Jungle"
          title={destination.destination}
          destination={destination.destination}
          trails={trails_string}
          // accessibility={destination.accessibility}
          location={"Address: " + destination.location}
          climate={"Climate: " + destination.climate}
          label="Adventure"
          path="/destinations"
        />
      </ul>
    )
  }

  function allCards(){
    const items = [];
      for(var i = 0; i < list.destinations.length; i++){
        items.push(
          card(list.destinations[i])
        );
      }
      // console.log(list.destinations.length);
    return (
      <>
        {items}
      </>
    );
  }

  const[searchInput, setInput] = useState("");
  //const[destOutput, setDestinations] = useState([]);

  const SearchDestination = async(e) =>{
    e.preventDefault();
    var sel = document.getElementById('searchOption'); // gets the dropdown value 
    try{
      if(sel.value=="name"){
        const results = await fetch(`http://localhost:5000/api/destinations/search/?destination_name=${searchInput}`);
        const parseResults = await results.json();

        // Setting list state 
        const contents = {
          destinations: []
        }; 
      
        for(var i = 0; i < parseResults.destinations.length; i++){
          //get destination name
          const destName = parseResults.destinations[i].destination_name;
          const trails = await fetch(`http://localhost:5000/api/trails/search/?destination_name=${destName}`);
          const trailResults = await trails.json();
          
          //get location associated with destination
          const location = await fetch(`http://localhost:5000/api/location/address/?val=${destName}`);
          const locationResults = await location.json();
          const locationString = locationResults.location[0].location_address;
          
          //get climate
          const location_coordinate = locationResults.location[0].location_coordinate;
          const climate = await fetch(`http://localhost:5000/api/locations/climate/?val=${location_coordinate}`);
          const climateResults = await climate.json();
          const climateString = climateResults.climate[0].climate_temp;
          
          //get trails associated with destination
          var trailArray = [];
          for(var j = 0; j < trailResults.trails.length; j++){
            trailArray[j] = trailResults.trails[j].trail_name;
          }

          //push
          contents.destinations.push({
            destination: parseResults.destinations[i].destination_name,
            trails: trailArray, 
            accessibility: "accessibility",
            location: locationString,
            climate: climateString
          });
        }
        // console.log("contents: ");
        // console.log(contents);

        setList(contents);

      }
      else if(sel.value=="state"){
        const results = await fetch(`http://localhost:5000/api/destinations/search/filter/state/?val=${searchInput}`);
        const parseResults = await results.json();

        // Setting list state 
        const contents = {
          destinations: []
        }; 

        for(var i = 0; i < parseResults.destinations.length; i++){
          //get destination name
          const destName = parseResults.destinations[i].destination_name;
          const trails = await fetch(`http://localhost:5000/api/trails/search/?destination_name=${destName}`);
          const trailResults = await trails.json();
          
          //get location associated with destination
          const location = await fetch(`http://localhost:5000/api/location/address/?val=${destName}`);
          const locationResults = await location.json();
          const locationString = locationResults.location[0].location_address;

          //get climate
          const location_coordinate = locationResults.location[0].location_coordinate;
          const climate = await fetch(`http://localhost:5000/api/locations/climate/?val=${location_coordinate}`);
          const climateResults = await climate.json();
          const climateString = climateResults.climate[0].climate_temp;

          //get trails associated with destination
          var trailArray = [];
          for(var j = 0; j < trailResults.trails.length; j++){
            trailArray[j] = trailResults.trails[j].trail_name;
          }

          //push
          contents.destinations.push({
            destination: parseResults.destinations[i].destination_name,
            trails: trailArray, 
            accessibility: "accessibility",
            location: locationString,
            climate: climateString
          });
        }
        // console.log("contents: ");
        // console.log(contents);

        setList(contents);
      }
      else{
        const results = await fetch(`http://localhost:5000/api/destinations/search/filter/zipcode/?val=${searchInput}`);
        const parseResults = await results.json();
      
        // Setting list state 
        const contents = {
          destinations: []
        }; 

        for(var i = 0; i < parseResults.destinations.length; i++){
          //get destination name
          const destName = parseResults.destinations[i].destination_name;
          const trails = await fetch(`http://localhost:5000/api/trails/search/?destination_name=${destName}`);
          const trailResults = await trails.json();
          
          //get location associated with destination
          const location = await fetch(`http://localhost:5000/api/location/address/?val=${destName}`);
          const locationResults = await location.json();
          const locationString = locationResults.location[0].location_address;

          //get climate
          const location_coordinate = locationResults.location[0].location_coordinate;
          const climate = await fetch(`http://localhost:5000/api/locations/climate/?val=${location_coordinate}`);
          const climateResults = await climate.json();
          const climateString = climateResults.climate[0].climate_temp;

          //get trails associated with destination
          var trailArray = [];
          for(var j = 0; j < trailResults.trails.length; j++){
            trailArray[j] = trailResults.trails[j].trail_name;
          }

          //push
          contents.destinations.push({
            destination: parseResults.destinations[i].destination_name,
            trails: trailArray, 
            accessibility: "accessibility",
            location: locationString,
            climate: climateString
          });
        }

        setList(contents);
      }
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    // Padding of the page contents
    <div className="cards">
      <h1>Explore your next destination!</h1>

      {/* Search Bar */}
      <Fragment>
        <div className="center">
          <form onSubmit={SearchDestination}>
            {/* Textbox  */}
            <input
              id="searchbar"
              type="text"
              name="destination"
              placeholder="Enter a state abbrev, zipcode, or destination name..."
              value={searchInput}
              onChange={(e) => setInput(e.target.value)}
            ></input>

            {/* Dropdown */}
            <select id="searchOption" className="searchOptions">
              <option value="name">Name</option>
              <option value="state">State</option>
              <option value="zipcode">Zipcode</option>
            </select>

            <button
              id="searchbutton"
              onClick={SearchDestination}
              className="btn-success"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </Fragment>

      {/* structure of the cards that are being displayed */}

      <div className="cards__container">
        <div className="cards__wrapper">{allCards()}</div>
      </div>
    </div>
  );
}
export default Destination_Cards;