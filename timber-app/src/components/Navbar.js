import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import Cookies from 'js-cookie';

function Navbar() {

    const [click, setClick] = useState(false);

    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    useEffect(() => {
        showButton()
    }, []);


    window.addEventListener('resize', showButton);
    // {/* button && <Button buttonStyle='btn--outline' path='/sign-up'> LOGIN </Button> */}
    const showLogin = () => {
        return (
            <Link to='/sign-up' className='btn--outline' onClick={closeMobileMenu}
                style={{ display: Cookies.get('name') == null ? '' : 'none', }}>
                Log In (Not logged in!)
            </Link>

            );
    }

    /*const showLogOff = () => {
        return (
            <Link to='/sign-up' className='btn--outline' onClick={closeMobileMenu}
                style={{ display: Cookies.get('name') != null ? '' : 'none', }}>
                Log Off (Logged in!)
            </Link>

        );
    }*/
    const handleLogOff = () => {
        Cookies.remove('name');
        window.location.reload();
    }

    const showLogOff = () => {
        return (
            <button onClick={handleLogOff}
                style={{ display: Cookies.get('name') != null ? 'btn--outline' : 'none'}}>
                Log Off
            </button>
        );
    }

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>

                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu} >
                        TIMBER <i className='fab fa-typo3' />
                    </Link>

                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>

                    <div class='menu-icon'>
                        
                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'} >
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        {/* <li className='nav-item'>
            <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
              Destination Details
            </Link>
          </li> */}
                        <li className='nav-item'>
                            <Link to='/destinations' className='nav-links' onClick={closeMobileMenu}>
                                Destinations
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/insert-destination' className='nav-links' onClick={closeMobileMenu}>
                                Add a Destination
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/user' className='nav-links' onClick={closeMobileMenu}>
                                User Details
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign Up
                            </Link>
                        </li>

                    </ul>
                    {showLogin()}
                    {showLogOff()}
                    {/* button && <Button buttonStyle='btn--outline' path='/sign-up'> LOGIN </Button> */}
                </div>

            </nav>
        </>
    )
}

export default Navbar;