// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import {Home} from './components/pages/Home';
import {Destinations} from './components/pages/Destinations';
import {Sign_up} from './components/pages/Sign-up';
import { User } from './components/pages/User';
import { CookiesProvider, useCookies } from 'react-cookie';
import { InsertDestination } from './components/pages/InsertDestination';


function App() {
    return (
        <CookiesProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/destinations' element={<Destinations />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/sign-up' element={<Sign_up />} />
                    <Route path='/insert-destination' element={<InsertDestination />} />
                </Routes>
            </Router>
        </CookiesProvider> 
    );
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
