import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Slider from './Pages/Slider';
import Registration from './Pages/Registration';
import Auto from './Pages/Auto';
import AddAvatar from './Pages/AddAvatar'

import Parse from 'parse';
const PARSE_APPLICATION_ID = '3ie8qOF36pNWqRXX08D1yvDKI61cGxAPHSbSONAG';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'xnDdGqcRgJnBYv7KFOjZQ4iHsFOLmw4w6Pmzra0s';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Slider />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/auto" element={<Auto />} />
        <Route path='/addavatar' element={<AddAvatar/>}/>
      </Routes>
    </Router>
  );
};

export default App;