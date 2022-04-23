import React from 'react';
import HikerAPI from "../../apis/HikerAPI";
import '../../App.css';
import { HeroSection } from '../HeroSection';
import { UserForm } from '../UserForm';

export function User(user) {

    function getUserDetails(){
        let userID = 1; // connect to database to get user details 
        const fetchData = async() => {
            try{
                const response = await HikerAPI.get("/");

                //print user details
                console.log("id: " + response.data.hikers[userID].hiker_userid);
                console.log("username: " + response.data.hikers[userID].hiker_username);
                console.log("password: " + response.data.hikers[userID].hiker_password);
                console.log("state: " + response.data.hikers[userID].hiker_state);
      
              }catch(err){
                console.log(err);
              }
            }//end of fetch data
            fetchData();
        
        return(
            <p>User ID: {userID}</p>
        )
    }

    function getUserFavorites(){
        let destination = "Grand Canyon"; // connect to database to get these details (select query)
        return(
            <p>Destination: {destination}</p>
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
