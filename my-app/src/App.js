import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './pages/SignUp.js';
import LogIn from './pages/LogIn.js';
import SettingsProfile from './pages/SettingsProfile.js';
import Map from './pages/Map.js';
import Trips from './pages/Trips.js';
import CreateTrip from './pages/CreateTrip.js';
import UpdateTrip from './pages/UpdateTrip.js';


function App() {
 return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/log-in' element={<LogIn/>}></Route>
        <Route path='/settings-profile' element={<SettingsProfile/>}></Route>
        <Route path='/map' element={<Map/>}></Route>
        <Route path='/trips' element={<Trips/>}></Route>
        <Route path='/create-new-trip' element={<CreateTrip/>}></Route>
        <Route path='/update-trip' element={<UpdateTrip/>}></Route>
      </Routes>
    </BrowserRouter>
    );
 
}

export default App;
