import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import {Route, Routes } from 'react-router-dom';
import "aos/dist/aos.css";
import Home from "./pages/Home"
const AOS = require('aos'); // This throws an error if you use import for some reason


function App() {

  useEffect(() => {
    AOS.init() // This initiates the animate on scroll library
  }, []);

  return (
    <>

        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
    </>
  );
}

export default App;
