import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import "./Cards.css";
import DestinationAPI from "../apis/destinationAPI";

export function DestinationForm() {

	const navigate = useNavigate();

	const [destinationName, setDestinationName] = useState('');
	const [trailName, setTrailName] = useState('');
	const [accessibility, setAccessibility] = useState('');
	const [location, setLocation] = useState('');
	const [climate, setClimate] = useState('');
	const [hours, setHours] = useState('');
	const [difficulty, setDifficulty] = useState('');

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	const handleDestinationName = (e) => {
		setDestinationName(e.target.value);
		setSubmitted(false);
	}

	const handleTrailName = (e) => {
		setTrailName(e.target.value);
		setSubmitted(false);

	}

	const handleAccessibility = (e) => {
		setAccessibility(e.target.value);
		setSubmitted(false);
	}

	const handleLocation = (e) => {
		setLocation(e.target.value);
		setSubmitted(false);
	}

	const handleClimate = (e) => {
		setClimate(e.target.value);
		setSubmitted(false);
	}
	const handleHours = (e) => {
		setHours(e.target.value);
		setSubmitted(false);
	}
	const handleDifficulty = (e) => {
		setDifficulty(e.target.value);
		setSubmitted(false);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (destinationName === '' || trailName === '' || location === '' || climate === '') {
			setError(true);
		}
		else {
			//add destination into database
			const addDestination = async () => {
                try{
                    const result = await DestinationAPI.post("/", 
                      {  
                        destination_name:destinationName
                      }
                  )
                  console.log(result);
                }catch(err){
                  console.log(err);
                }
              }
            addDestination();

			//add trail
			const addTrail = async () => {
                try{
                    const result = await DestinationAPI.post("/", 
                    {  
                        destination_name: destinationName
                    }
                  )
                  console.log(result);
                }catch(err){
                  console.log(err);
                }
              }
            addTrail();



			setSubmitted(true);
			setError(false);
		}
	}

	// Showing success message
	const successMessage = () => {
		return (
			<div
				className="success"
				style={{
					display: submitted ? '' : 'none',
				}}>
				<h1>Trail at {location} successfully added!!</h1>
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
						<h1 className="center">Insert a Destination</h1>
					</div>
					<div className="center">
						<input onChange={handleDestinationName} className="input" id="forminput" placeholder="Destination Name"
							value={destinationName} type="text" />
					</div>
					<div className="center">
						<input onChange={handleTrailName} className="input" id="forminput" placeholder="Trail Name"
							value={trailName} type="text" />
					</div>
					<div className="center">
						<input onChange={handleLocation} className="input" id="forminput" placeholder="Location"
							value={location} type="text" />
					</div>
					<div className="center">
						<input onChange={handleClimate} className="input" id="forminput" placeholder="Climate"
							value={climate} type="text" />
					</div>
					<div>
						<button onClick={handleSubmit} className="btn" id="searchbutton" type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}