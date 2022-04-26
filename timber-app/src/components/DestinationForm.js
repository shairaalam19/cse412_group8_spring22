import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import "./Cards.css";
import GenericAPI from "../apis/GenericAPI";

export function DestinationForm() {

	const navigate = useNavigate();

	//========================== State declaration ============================
	//declare destination state
	const [destinationName, setDestinationName] = useState('');

	//declare trail state
	const [trailName, setTrailName] = useState('');
	const [trailLength, setTrailLength] = useState('');
	const [trailHours, setTrailHours] = useState('');
	const [trailDifficulty, setTrailDifficulty] = useState('');
	const [trailGain, setTrailGain] = useState('');

	//declare accessibility state
	const [petFriendly, setPetFriendly] = useState('');
	const [parkingCost, setParkingCost] = useState('');

	//declare location state
	const [location, setLocation] = useState('');
	const [coordinate, setCoordinate] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zipcode, setZipcode] = useState('');

	//declare climate state 
	const [climate, setClimate] = useState(''); //season
	const [temperature, setTemperature] = useState('');

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	//=============================== Handler ===================================
	//handle destination
	const handleDestinationName = (e) => {
		setDestinationName(e.target.value);
		setSubmitted(false);
	}
	
	//handle trail
	const handleTrailName = (e) => {
		setTrailName(e.target.value);
		setSubmitted(false);
	}
	const handleTrailLength = (e) => {
		setTrailLength(e.target.value);
		setSubmitted(false);
	}
	const handleTrailHours = (e) => {
		setTrailHours(e.target.value);
		setSubmitted(false);
	}
	const handleTrailDifficulty = (e) => {
		setTrailDifficulty(e.target.value);
		setSubmitted(false);
	}
	const handleTrailGain = (e) => {
		setTrailGain(e.target.value);
		setSubmitted(false);
	}

	//handle accessibility
	const handlePetFriendly = (e) => {
		setPetFriendly(e.target.value);
		setSubmitted(false);
	}
	const handleParkingCost = (e) => {
		setParkingCost(e.target.value);
		setSubmitted(false);
	}

	//handle location
	const handleCoordinate = (e) => {
		setCoordinate(e.target.value);
		setSubmitted(false);
	}
	const handleCity = (e) => {
		setCity(e.target.value);
		setSubmitted(false);
	}
	const handleState = (e) => {
		setState(e.target.value);
		setSubmitted(false);
	}
	const handleZipcode = (e) => {
		setZipcode(e.target.value);
		setSubmitted(false);
	}
	const handleLocation = (e) => {
		setLocation(e.target.value);
		setSubmitted(false);
	}

	//handle climate
	const handleClimate = (e) => {
		setClimate(e.target.value);
		setSubmitted(false);
	}
	const handleTemperature = (e) => {
		setTemperature(e.target.value);
		setSubmitted(false);
	}

	//submit
	const handleSubmit = (e) => {
		e.preventDefault();
		if (destinationName === '' || trailName === '' /*|| location === '' || climate === ''*/) {
			setError(true);
		}
		else {
			//first check if destination exists already

            const CheckDestination = async (e) => {
              try{
				//retrieve size of destination table
                const results = await fetch(`http://localhost:5000/api/destinations/search/one/?val=${destinationName}`);
                const parseResults = await results.json();
				const num = parseResults.destinations.length;

				//if there is no match, destination does NOT exist
				if(num==0){
					//add new destination into database
					const addDestination = async () => {
						try{
							const result = await GenericAPI.post("/destinations/", 
							{  
								destination_name:destinationName
							}
						)
						console.log(result); //success
						}
						catch(err){
						console.log(err);
						}
					}
					addDestination();
				}
              }catch(err){
                console.log(err);
              }
            }
           CheckDestination();

			//add trail based on destination name
			const addTrail = async () => {
                try{
                    const result = await GenericAPI.post("/trails/", 
                    {  
						trail_name: trailName //req.body
                    }
                  )
                  console.log(result);
                }catch(err){
                  console.log(err);
                }
              }
            addTrail();

			//add trail to destination relationship
			const addTrailDestinationRel = async () => {
				try{
					const result = await GenericAPI.post("/newtrails/", 
					{  
						trail_name: trailName, //req.body
						destination_name: destinationName
					}
				)
				console.log(result);
				}catch(err){
				console.log(err);
				}
			}
			addTrailDestinationRel();	
			
			//add location


			//add climate



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

			<div id="form-style" className="form-container">
				<video id="vid" src='/videos/video-4.mp4' autoPlay loop muted />
				<form >
					<div>
						<br></br>
						<h1 className="center">Add a Destination</h1>
					</div>
					<div className="center">
						<input onChange={handleDestinationName} className="input" id="forminput" placeholder="Destination Name"
							value={destinationName} type="text" />
					</div>


					<h2 className="center">Trail</h2>
					<div className="center">
						<input onChange={handleTrailName} className="input" id="forminput" placeholder="Trail Name"
							value={trailName} type="text" />
						<input onChange={handleTrailLength} className="input" id="forminput" placeholder="Length (miles)"
							value={trailLength} type="text" />
						<input onChange={handleTrailHours} className="input" id="forminput" placeholder="Hours open"
							value={trailHours} type="text" />
						<input onChange={handleTrailDifficulty} className="input" id="forminput" placeholder="difficulty level (easy, medium, hard)"
							value={trailDifficulty} type="text" />
						<input onChange={handleTrailGain} className="input" id="forminput" placeholder="elevation gain (feet)"
							value={trailGain} type="text" />
					</div>
					
					<h2 className="center">Accessibility</h2>
					<div className="center">
						<input onChange={handlePetFriendly} className="input" id="forminput" placeholder="Pet Friendly (Yes, No)"
							value={petFriendly} type="text" />
						<input onChange={handleParkingCost} className="input" id="forminput" placeholder="Parking Cost"
							value={parkingCost} type="text" />
					</div>

					<h2 className="center">Location</h2>
					<div className="center">
					<input onChange={handleLocation} className="input" id="forminput" placeholder="Location"
							value={location} type="text" />
					<input onChange={handleCoordinate} className="input" id="forminput" placeholder="Coordinate"
							value={coordinate} type="text" />
					<input onChange={handleCity} className="input" id="forminput" placeholder="City"
							value={city} type="text" />
					<input onChange={handleState} className="input" id="forminput" placeholder="State Abbreviation (AZ, NY)"
							value={state} type="text" />
					<input onChange={handleZipcode} className="input" id="forminput" placeholder="Zipcode"
							value={zipcode} type="text" />
					</div>


					<h2 className="center">Climate</h2>
					<div className="center">
						<input onChange={handleClimate} className="input" id="forminput" placeholder="Season"
							value={climate} type="text" />
						<input onChange={handleTemperature} className="input" id="forminput" placeholder="Temperature"
							value={temperature} type="text" />
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