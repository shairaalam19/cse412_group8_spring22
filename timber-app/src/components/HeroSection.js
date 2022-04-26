import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import Cookies from 'js-cookie';

const renderWelcomeSignedIn = () => {
    return (
        <h1 style={{ display: Cookies.get('userid') != null ? '' : 'none', }}>
            WELCOME TO TIMBER, {Cookies.get('name')}!
        </h1>
        );
}

const renderWelcomeNoSign = () => {
    return (
        <h1 style={{ display: Cookies.get('userid') == null ? '' : 'none', }}>
            WELCOME TO TIMBER!
        </h1>
        );
}

export function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-4.mp4' autoPlay loop muted />
          {renderWelcomeSignedIn()}
          {renderWelcomeNoSign()}
      <p>Explore where your next destination will be!</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          path='/sign-up'
        >
          LOGIN
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          path='/destinations'
          // onClick={console.log('hey')}
        >
          SEE DESTINATIONS <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;