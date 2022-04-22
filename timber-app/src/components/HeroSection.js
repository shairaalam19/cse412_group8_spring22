import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

export function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-4.mp4' autoPlay loop muted />
      <h1>WELCOME TO TIMBER</h1>
      <p>Explore where your next destination will be!</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          path='/sign-up'
        >
          SIGN UP
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          path='/destination'
          // onClick={console.log('hey')}
        >
          SEE DESTINATIONS <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;