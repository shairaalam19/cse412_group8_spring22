import React from 'react';
import '../../App.css';
import { HeroSection } from '../HeroSection';
import { UserForm } from '../UserForm';
import { SignInForm } from '../SignInForm';
import { DestinationForm } from '../DestinationForm';

export function InsertDestination() {
    return (
        <center>
             <DestinationForm/>
        </center>

    );
}