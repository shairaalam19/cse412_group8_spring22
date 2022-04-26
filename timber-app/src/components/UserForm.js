
import { useState } from 'react';
import Cookies from 'js-cookie';
import HikerAPI from "../apis/HikerAPI";

export function UserForm() {

    //state for user count
    const[hikerCount, setHikerCount] = useState(0);
    // States for registration
    const [name, setName] = useState('');
    //const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the state change
    const handleState = (e) => {
        setState(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || state === '' || password === '') {
            setError(true);
        } else {

            var addedSuccessfully = false;
            
            //get total hiker count to create new id for new user
            // async function GetCount() {
            //       try{
            //         const results = await fetch("http://localhost:5000/api/hikers");
            //         const parseResults = await results.json();
            //         setHikerCount(parseResults.hikers.length);
            //       }catch(err){
            //         console.log(err);
            //       }
            // }
            // GetCount();

            // const randomNum = Math.floor(Math.random()*99999);
            // setHikerCount(randomNum);
            // console.log("Initial count: " + hikerCount);

              //add hiker to database
              const addHikers = async (e) => {
                try{ //successful
                    const result = await HikerAPI.post("/", 
                      {  // vvvv this is the format for INSERTING data into the our database
                        hiker_userid: Math.floor(Math.random()*99999), 
                        hiker_username: name,
                        hiker_password: password,
                        hiker_state: state
                      }
                  )
                  const val_id = result.data.hiker.hiker_userid;
                  Cookies.set('userid', val_id, { expires: 1 });
                  setHikerCount(val_id);
                  console.log(result);
                  addedSuccessfully=true;
                }catch(err){ //error
                  console.log(err);
                }
              }

              addHikers().then((checkHikers) => {
                if(addedSuccessfully){
                  setSubmitted(true);
                  setError(false);
                  console.log("Cookies id set to: " + Cookies.get('userid')); 
                }else{
                  setSubmitted(true);
                  setError(false);
                }
        
              });
          }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {name} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div className="form">

            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <div className="form-container">
                <form>
                    <div>
                        <h1>User Registration</h1>
                    </div>
                <div>
                        
                        <input onChange={handleName} className="input" placeholder="Name"
                            value={name} type="text" />
                </div>
                <div>
                        
                        <input onChange={handlePassword} className="input" placeholder="Password"
                            value={password} type="password" />
                    </div>
                    <div>
                        
                        <input onChange={handleState} className="input" placeholder="State"
                        value={state} type="text" />
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="btn" type="submit">
                        Submit
                        </button>
                        </div>
                </form>
            </div>

        </div>
    );
}

/*
import React, {useState, useEffect} from 'react';

export function UserForm() {
    const [contactInfo, setContactInfo] = useState({
        username: "",
        password: "",
        state: "",
      });

    return (
        <div className="form-container">
        <form>
          <div>
            <h3>Registration Form</h3>
          </div>
          <div>
            <input
              type="text"
              usernamename="username"
              placeholder="Name"
              value={contactInfo.username}
            />
          </div>
          <div>
            <input
              type="text"
              name="password"
              placeholder="password"
              value={contactInfo.password}
            />
          </div>
          <div>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={contactInfo.state}
            />
          </div>
          <div>
            <button>Submit Form</button>
          </div>
        </form>
      </div>
    )
}

export default UserForm;
*/