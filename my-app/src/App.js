import './App.css';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './pages/SignUp.js';
import LogIn from './pages/LogIn.js';
import Trips from './pages/Trips.js';
import Update from './pages/Update.js';
import Map from './pages/Map.js';

function App() {
 return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp/>}></Route>
        <Route path='/' element={<LogIn/>}></Route>
        <Route path='/map' element={<Map/>}></Route>
        <Route path='/trips' element={<Trips/>}></Route>
        <Route path='/map' element={<Map/>}></Route>
        <Route path='/update' element={<Update/>}></Route>
      </Routes>
    </BrowserRouter>
    );
 
}

export default App;
