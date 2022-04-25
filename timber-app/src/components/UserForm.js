
import { useState } from 'react';
import HikerAPI from "../apis/HikerAPI";

export function UserForm() {

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
            const addHikers = async () => {
                try{
                    const result = await HikerAPI.post("/", 
                      {  // vvvv this is the format for INSERTING data into the our database
                        hiker_userid: 10000, //NEEDS TO BE RANDOMIZED
                        hiker_username: name,
                        hiker_password: password,
                        hiker_state: state
                      }
                  )
                  console.log(result);
                }catch(err){
                  console.log(err);
                }
              }
              addHikers();

            setSubmitted(true);
            setError(false);
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