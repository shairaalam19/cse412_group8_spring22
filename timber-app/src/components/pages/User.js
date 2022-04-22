import React from 'react';
import '../../App.css';
import { HeroSection } from '../HeroSection';
import { UserForm } from '../UserForm';

export function User(user) {
    function getUserFavorites(){
        let destination = "Grand Canyon"; // connect to database to get these details (select query)
        return(
            <p>Destination: {destination}</p>
        )
    }

    function getUserDetails(){
        let userID = 1; // connect to database to get user details 
        return(
            <p>User ID: {userID}</p>
        )
    }
  
  return (
    <>
        <div className="user">
            <h1>User Details</h1>
            {getUserDetails()}
        </div>
        <div className="user">
            <h1>Favorites</h1>
            {getUserFavorites()}
        </div>
    </>
  );
}

export default User;
