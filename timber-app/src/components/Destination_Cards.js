import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import {Button} from './Button';

const list = [
  "Grand Canyon", 
  "Zion National Park",
  "Camelback Mountain",
  "Tonto National Forest",
  "Colorado Springs"
]

export function Destination_Cards(props) {

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

  function allCards(size){
    const items = [];

    for(var i = 0; i < size; i++){
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

  return (
    // Padding of the page contents 
    <div className="cards">
      <h1>Explore your next destination!</h1>
      {/* structure of the cards that are being displayed */}
      <div className="cards__container">
        <div className="cards__wrapper">
          {/* <ul className="cards__items"> */}
            {allCards(4)}
          {/* </ul> */}
          {/* Creates a card row wit hthe "cards__items" class */}
          {/* <ul className="cards__items">
            <CardItem
              src="images/img-9.jpg"
              text="Explore the hidden waterfall deep inside the Amazon Jungle"
              label="Adventure"
              path="/sign-up"
              destination="Amazon Jungle"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-2.jpg"
              text="Travel through the islands of Bali in a private cruise"
              label="Luxury"
              path="/details"
              destination="Bali"
            />
          </ul>

          <ul className="cards__items">
            <CardItem
              src="images/img-3.jpg"
              text="Set sail in the Atlantic Ocean visiting uncharted waters"
              label="Mystery"
              path="/details"
              destination="Atlantic Ocean"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-4.jpg"
              text="Experience football at the top of the Himilayan Mountains"
              label="Adventure"
              path="/details"
              destination="Himilayan Mountains"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-8.jpg"
              text="Ride through the Sahara Desert on a guided camel tour"
              label="Adrenaline"
              path="/details"
              destination="Sahara Desert"
            />
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default Destination_Cards;
