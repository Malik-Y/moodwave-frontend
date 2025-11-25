import { useState } from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import MainOrb from './components/mainOrb.jsx';
import RandomLyric from "./components/RandomLyric.jsx";
import MoodSelector from "./components/MoodSelector.jsx";

function App() {

  return (
    <>
<div className='overflow-hidden'>
        <Header/>
            {/*Section 1:Welcome and Orb*/}



            {/*Orb*/}
            <MainOrb/>
    </div>



            {/*Section 2:Emotion Picking*/}



            {/*Section 3:Playlists*/}

    </>


  )
}

export default App
