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

    const[allUsers, setAllUsers] = useState({})

    const [favorites, setFavorites] = useState("");

    useEffect(() =>{
        // console.log("userData: ")
        // console.log(userData)
        // console.log("allUsers: ")
        // console.log(allUsers)
    }, [])
    
    function getUserDetails(id){
        // var userID = 1; // connect to database to get user details
        const fetchData = async() => {
            try{
                const response = await HikerAPI.get("/"+id);
                // console.log(response)
                const user = response.data.hiker;
                // console.log(user);
                setUserData({
                    hiker_userid: user.hiker_userid,
                    hiker_username: user.hiker_username,
                    hiker_password: user.hiker_password,
                    hiker_state: user.hiker_state.toUpperCase()
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
                // console.log(response.data)
                
                var favorites_string = [];
                for(var i = 0; i < list.length; i++){
                    favorites_string.push(
                        <>
                            {list[i].destination_name}<br></br>
                        </>
                    )
                }
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

    // console.log(Cookies.get("userid"))
  
    return (
        <>
            <div className="user">
                <h1>User Details</h1>
                {getUserDetails(Cookies.get("userid"))}
            </div>
            <div className="user">
                <h1>Favorites</h1>
                {getUserFavorites(Cookies.get("userid"))}
            </div>
        </>
    );
}

export default User;
