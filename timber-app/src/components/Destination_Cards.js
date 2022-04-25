import React, { Fragment, useState } from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import {Button} from './Button';


export function Destination_Cards(props) {
  const [list, setList] = useState({});

  function card(destination){
    return (
      <ul className="cards__items">
        <CardItem
          // src="images/img-9.jpg"
          // text="Explore the hidden waterfall deep inside the Amazon Jungle"
          title={destination}
          trails="Trails" 
          accessibility="Accessibility" 
          location="Location"
          climate="Climate"
          label="Adventure"
          path="/sign-up"
        />
      </ul>
    )
  }

  function allCards(){
    const items = [];

    // list = props.destinations;

    for(var i = 0; i < list.length; i++){
      items.push(
        card(list[i])
      );
    }

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
        
        const contents = []; 
        for(var i = 0; i < parseResults.destinations.length; i++){
          contents.push(parseResults.destinations[i].destination_name);
        }
        setList(contents);
        console.log(parseResults.destinations);
        console.log(list);
      }
      else if(sel.value=="state"){
        const results = await fetch(`http://localhost:5000/api/destinations/search/filter/state/?val=${searchInput}`);
        const parseResults = await results.json();
        const contents = []; 
        for(var i = 0; i < parseResults.destinations.length; i++){
          contents.push(parseResults.destinations[i].destination_name);
        }
        setList(contents);
        console.log(parseResults.destinations);
        console.log(list);
      }
      else{
        const results = await fetch(`http://localhost:5000/api/destinations/search/filter/zipcode/?val=${searchInput}`);
        const parseResults = await results.json();
        const contents = []; 
        for(var i = 0; i < parseResults.destinations.length; i++){
          contents.push(parseResults.destinations[i].destination_name);
        }
        setList(contents);
        console.log(parseResults.destinations);
        console.log(list);
      }
    }
    catch(err){
      console.error(err.message)
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
        <input id="searchbar" type="text" name="destination" placeholder="Enter a state abbrev, zipcode, or destination name..."
        value={searchInput} onChange={e=>setInput(e.target.value)}></input>

        {/* Dropdown */}
        <select id="searchOption" className="searchOptions">
          <option value="name">Name</option>
          <option value="state">State</option>
          <option value="zipcode">Zipcode</option>
        </select>

        <button id="searchbutton" className="btn-success">Search</button>
        
        </form>
      </div>
      </Fragment>

      {/* structure of the cards that are being displayed */}

      <div className="cards__container">
        <div className="cards__wrapper">
          {allCards()}
        </div>
      </div>
    </div>
  );
}

export default Destination_Cards;
