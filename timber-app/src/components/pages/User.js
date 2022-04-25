import React, {useState} from 'react';
import HikerAPI from "../../apis/HikerAPI";
import '../../App.css';
import { HeroSection } from '../HeroSection';
import { UserForm } from '../UserForm';
import Cookies from 'js-cookie';

export function User(user) {
    const [userData, setUserData] = useState({
        hiker_userid: "",
        hiker_username:"",
        hiker_password: "",
        hiker_state: ""
    })
    
    function getUserDetails(name){
        // var userID = 1; // connect to database to get user details
        const fetchData = async() => {
            try{
                const response = await HikerAPI.get("/");
                const users = response.data.hikers;
                var i = 0;
                for(i = 0; i < response.data.length; i++){
                    if(users[i] == name){
                        break;
                    }
                }

                setUserData({
                    hiker_userid: response.data.hikers[i].hiker_userid,
                    hiker_username: response.data.hikers[i].hiker_username,
                    hiker_password: response.data.hikers[i].hiker_password,
                    hiker_state: response.data.hikers[i].hiker_state
                });
                //print user details
                // console.log("id: " + response.data.hikers[userID].hiker_userid);
                // console.log("username: " + response.data.hikers[userID].hiker_username);
                // console.log("password: " + response.data.hikers[userID].hiker_password);
                // console.log("state: " + response.data.hikers[userID].hiker_state);
            }
            catch(err){
                console.log(err);
                // return err;
            }
        }//end of fetch data
        
        fetchData();
        
        return(
            // <p>User ID: {userID}</p>
            <>
                <p>Hiker ID#: {userData.hiker_userid}</p>
                <p>Username: {userData.hiker_username}</p>
                <p>HikerID: {userData.hiker_password}</p>
                <p>State: {userData.hiker_state}</p>
            </>
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
                {getUserDetails(Cookies.get("name"))}
            </div>
            <div className="user">
                <h1>Favorites</h1>
                {getUserFavorites()}
            </div>
        </>
    );
}

export default User;
