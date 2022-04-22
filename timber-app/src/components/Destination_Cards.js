import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import {Button} from './Button';



export function Destination_Cards() {
  return (
    // Padding of the page contents 
    <div className="cards">
      <h1>Explore your next destination!</h1>
      {/* structure of the cards that are being displayed */}
      <div className="cards__container">
        <div className="cards__wrapper">

          {/* Creates a card row wit hthe "cards__items" class */}
          <ul className="cards__items">
            <CardItem
              src="images/img-9.jpg"
              text="Explore the hidden waterfall deep inside the Amazon Jungle"
              label="Adventure"
              path="/services"
              destination="Amazon Jungle"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-2.jpg"
              text="Travel through the islands of Bali in a private cruise"
              label="Luxury"
              path="/services"
              destination="Bali"
            />
          </ul>

          <ul className="cards__items">
            <CardItem
              src="images/img-3.jpg"
              text="Set sail in the Atlantic Ocean visiting uncharted waters"
              label="Mystery"
              path="/services"
              destination="Atlantic Ocean"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-4.jpg"
              text="Experience football at the top of the Himilayan Mountains"
              label="Adventure"
              path="/sign-up"
              destination="Himilayan Mountains"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-8.jpg"
              text="Ride through the Sahara Desert on a guided camel tour"
              label="Adrenaline"
              path="/sign-up"
              destination="Sahara Desert"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Destination_Cards;
