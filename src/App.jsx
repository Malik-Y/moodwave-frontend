import { useState } from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import MainOrb from './components/mainOrb.jsx';
import RandomLyric from "./components/RandomLyric.jsx";
import Galaxy from "./components/Galaxy.jsx";

function App() {

  return (
    <>

    <div className="relative w-screen  h-full overflow-x-hidden ">
                <Galaxy

                    mouseRepulsion={false}
                    mouseInteraction={false}
                    density={2.5}
                    glowIntensity={0.5}
                    saturation={0.8}
                    hueShift={101}
                />
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
