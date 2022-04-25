import React, {useState, useEffect} from 'react';
import HikerAPI from "../../apis/HikerAPI";
import FavoriteAPI from "../../apis/FavoriteAPI";
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
    });
    const [favorites, setFavorites] = useState("");
    
    function getUserDetails(id){
        // var userID = 1; // connect to database to get user details
        const fetchData = async() => {
            try{
                const response = await HikerAPI.get("/");
                const users = response.data.hikers;
                setUserData({
                    hiker_userid: response.data.hikers[id].hiker_userid,
                    hiker_username: response.data.hikers[id].hiker_username,
                    hiker_password: response.data.hikers[id].hiker_password,
                    hiker_state: response.data.hikers[id].hiker_state.toUpperCase()
                });
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
                <p>Pasword: {userData.hiker_password}</p>
                <p>State: {userData.hiker_state}</p>
            </>
        )
    }

    function getUserFavorites(id){
        // var userID = 1; // connect to database to get user details
        const fetchData = async() => {
            try{
                const response = await FavoriteAPI.get("/" + id);
                var list = response.data.favorites;
                
                var favorites_string = [];
                for(var i = 0; i < list.length-1; i++){
                    favorites_string.push(
                        <>
                            {list[i].destination_name}<br></br>
                        </>
                    )
                }
                favorites_string.push(
                    <>
                        {list[list.length-1].destination_name}
                    </>
                )
    
                setFavorites(favorites_string);
            }
            catch(err){
                console.log(err);
                // return err;
            }
        }//end of fetch data
        
        fetchData();

        return(
            <>
                {/* <p>Destination: {favorites[0].destination_name}</p> */}
                <p>{favorites}</p>
            </>
        )
    }
  
    return (
        <>
            <div className="user">
                <h1>User Details</h1>
                {getUserDetails(2)}
            </div>
            <div className="user">
                <h1>Favorites</h1>
                {getUserFavorites(2)}
            </div>
        </>
    );
}

export default User;
