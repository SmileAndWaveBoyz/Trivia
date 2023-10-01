import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import {Route, Routes } from 'react-router-dom';
import "aos/dist/aos.css";
import Game from "./pages/Game"
const AOS = require('aos'); // This throws an error if you use import for some reason


function App() {

  const [difficulty, setDifficulty] = useState("&difficulty=easy")
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(0)

  useEffect(() => {
    AOS.init() // This initiates the animate on scroll library
  }, []);

  return (
    <>
    <div className='container'>
        <div className="slide">
          {
            page === 0 ?
          
            <div className="questionContainer">
              <h1 data-aos = {"flip-left"}>Hey there! Welcome to Nathan's super fun trvia quiz. <br></br>Please select a difficulty:</h1> 
              <div data-aos={"fade-up"} className="questionContainer__buttonContainer">
                  <button className='questionContainer__answerButton' onClick={()=> {setDifficulty("&difficulty=easy"); setPage(1)}}>Easy</button>
                  <button className='questionContainer__answerButton' onClick={()=> {setDifficulty("&difficulty=medium"); setPage(1)}}>Medium</button>
                  <button className='questionContainer__answerButton' onClick={()=> {setDifficulty("&difficulty=hard"); setPage(1)}}>Hard</button>
              </div>
            </div>
            :
            page === 1 ?
            <div className="questionContainer">
              <h1>Now select a category</h1> 
              <div className="questionContainer__buttonContainer home">
                  <button className='questionContainer__answerButton' onClick={()=> {setPage(2)}}>Any</button>
                  <button className='questionContainer__answerButton' onClick={()=> {setCategory("&category=9"); setPage(2)}}>General</button>
                  <button className='questionContainer__answerButton' onClick={()=> {setCategory("&category=27"); setPage(2)}}>Animals</button>
                  <button className='questionContainer__answerButton' onClick={()=> {setCategory("&category=26"); setPage(2)}}>Celebrities</button>
                  <button className='questionContainer__answerButton' onClick={()=> {setCategory("&category=11"); setPage(2)}}>Films</button>
                  <button className='questionContainer__answerButton' onClick={()=> {setCategory("&category=14"); setPage(2)}}>TV</button>
                  <button className='questionContainer__answerButton' onClick={()=> {setCategory("&category=12"); setPage(2)}}>Music</button>
                  <button className='questionContainer__answerButton' onClick={()=> {setCategory("&category=18"); setPage(2)}}>Computers</button>
              </div>
            </div>
            :
            page === 2 ?

            <Game difficulty={difficulty} category={category}/>
            :
            null
            }
        </div>
    </div>

    </>
  );
}

export default App;
