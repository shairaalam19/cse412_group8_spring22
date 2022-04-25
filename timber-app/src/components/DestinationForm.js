import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export function DestinationForm() {

	const navigate = useNavigate();

	const [trailName, setTrailName] = useState('');
	const [trailLength, setTrailLength] = useState('');
	const [accessibility, setAccessibility] = useState('');
	const [location, setLocation] = useState('');
	const [climate, setClimate] = useState('');
	const [hours, setHours] = useState('');
	const [difficulty, setDifficulty] = useState('');

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	const handleTrailName = (e) => {
		setTrailName(e.target.value);
		setSubmitted(false);

	}

	const handleTrailLength = (e) => {
		setTrailLength(e.target.value);
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
		if (trailLength === '' || accessibility === '' || location === '' || climate === '') {
			setError(true);
		}
		else {
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
						<h1>Insert a Destination</h1>
					</div>
					<div>
						<input onChange={handleTrailName} className="input" placeholder="Trail Name"
							value={trailName} type="text" />
					</div>
					<div>
						<input onChange={handleTrailLength} className="input" placeholder="Trail Length"
							value={trailLength} type="text" />
					</div>
					<div>
						<input onChange={handleAccessibility} className="input" placeholder="Accessibility"
							value={accessibility} type="text" />
					</div>
					<div>
						<input onChange={handleLocation} className="input" placeholder="Location"
							value={location} type="text" />
					</div>
					<div>
						<input onChange={handleClimate} className="input" placeholder="Climate"
							value={climate} type="text" />
					</div>
					<div>
						<input onChange={handleHours} className="input" placeholder="Hours"
							value={hours} type="text" />
					</div>
					<div>
						<input onChange={handleDifficulty} className="input" placeholder="Difficulty"
							value={difficulty} type="text" />
					</div>
					<div>
						<button onClick={handleSubmit} className="btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}