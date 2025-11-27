import { useState } from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import HomePage from './components/HomePage.jsx';
import RandomLyric from "./components/RandomLyric.jsx";
import Galaxy from "./components/Galaxy.jsx";

function App() {
  return (
    <div className=" w-screen h-screen">

      {/* Background Galaxy */}
      <Galaxy
        mouseRepulsion={false}
        mouseInteraction={false}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={181}
      />

      {/* Foreground Content */}
      <div className="relative w-screen">
        <Header />
        <HomePage />
      </div>

    </div>
  );
}


export default App
