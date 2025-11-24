import { useState } from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import MainOrb from './components/mainOrb.jsx';
import RandomLyric from "./components/Template.jsx";
import MoodSelector from "./components/MoodSelector.jsx";

function App() {

  return (
    <>

        <Header/>
            {/*Section 1:Welcome and Orb*/}



            {/*Orb*/}
            <MainOrb/>

            <RandomLyric/>

            {/*Section 2:Emotion Picking*/}

            <MoodSelector/>

            {/*Section 3:Playlists*/}

    </>


  )
}

export default App
