import React from 'react';
import '../../App.css';
import { HeroSection } from '../HeroSection';
import { UserForm } from '../UserForm';
import { SignInForm } from '../SignInForm';

export function Sign_up() {
  return (
    <>
      {/* <HeroSection /> */}
          {/* <Cards/> */}
          <center>
              <table class="reg-table">
                  <tr>
                      <th><SignInForm /></th>
                      <th><UserForm /></th>
                  </tr>
              </table>
          </center>
    </>
  );
}

export default Sign_up;
