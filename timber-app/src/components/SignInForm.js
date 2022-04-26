import { useState } from 'react';
//import { useCookies } from 'universal-cookie';
//import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export function SignInForm() {

    const navigate = useNavigate();
    //here's a cookie to be used elsewhere.
    //const [cookies, setCookie] = useCookies(['name']);
    // States for registration
    const [name, setName] = useState('');
    //const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [signedIn, setSignedIn] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSignedIn(false);
    };


    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSignedIn(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || password === '') {
            setError(true);
        } else {
            setError(false);
            //Now here we have to set a cookie to contain the user's name. This is a skeletal function: update the below code with a SQL query that matches the username and password together, and then set the cookie if that is valid.
            let loginSuccessfully = false;
            const AttemptLogin = async(e) => {
                try{
                    const results = await fetch(`http://localhost:5000/api/hikers/verify/login/?username=${name}&password=${password}`);
                    const parseResults = await results.json();
                    const size = parseResults.size;
                    if(size == 1){
                        loginSuccessfully=true;
                        Cookies.set('userid', parseResults.hiker[0].hiker_userid);
                    }
                    else
                        loginSuccessfully=false;
                }catch(err){
                    console.log(err);
                }
            }
            
            AttemptLogin().then(() => {
                console.log("login: " + loginSuccessfully);
                if(loginSuccessfully){
                    setSignedIn(true);
                    window.location.replace('/');
                    navigate('/');
                }else{
                    setError(true);
                }
            })
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: Cookies.get('name') != null ? '' : 'none',
                }}>
                <h1>{Cookies.get('name')} signed in!</h1>
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
                <h1>Please enter all the fields or invalid sign in</h1>
            </div>
        );
    };

    const renderForm = () => {
        return (
            <div style={{display: (Cookies.get('name') == null) ? '' : 'none',}}
                className="form-container">
                <form>
                    <div>
                        <h1>User Sign In</h1>
                    </div>
                    {/* Labels and inputs for form data */}
                    <div>
                        <input onChange={handleName} className="input" placeholder="Name"
                            value={name} type="text" />
                    </div>
                    <div>
                        <input onChange={handlePassword} className="input" placeholder="Password"
                            value={password} type="password" />
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            
        );
    }

    return (
        <div className="form">

            {/* Calling to the methods */}
            <div className="messages">
                {}
                {errorMessage()}
                {successMessage()}
            </div>
            <br></br>
            {renderForm()}

        </div>
    );
}