import {useState} from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import HomePage from './components/HomePage';
import RandomLyric from "./components/RandomLyric.jsx";
import MoodSelector from "./components/MoodSelector.jsx";
import ProfileIcon from "./components/assets/profile.png"
import Prev from "./components/assets/previous.png"
import Next from "./components/assets/next.png"
import {Link} from "react-router-dom";
import Galaxy from "./components/Galaxy.jsx";
import { useLocation } from "react-router-dom";

function Musicplayer() {

const location = useLocation();
const mood = location.state?.mood || "Energized";

    return (
        <>
            <div className="relative w-screen h-screen overflow-hidden">
                <Galaxy
                    mouseRepulsion={false}
                    mouseInteraction={false}
                    density={2.5}
                    glowIntensity={0.5}
                    saturation={0.8}
                    hueShift={101}
                />


                <div className=" w-full text-white h-100vh">
                    <div className="flex flex-col items-center px-4 mt-20 md:px-10">
                        {/* NAV */}
                        <div className="Nav glass mb-10 px-6 py-3 text-lg md:text-xl">
                            <p className="font-bold">{mood}</p>
                        </div>

                        {/* PREVIEW */}
                        <div className="musicPreview w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80"></div>

                        {/* SONG INFO */}
                        <div className="songInfo w-full max-w-md mt-10 text-center px-2">
                            <p className="Title text-2xl md:text-4xl mb-3 font-bold">Lasers</p>
                            <p className="Name text-sm md:text-base font-light">Pnd & Drake</p>
                            <p className="Album text-xs md:text-sm font-extralight mt-1 mb-5">Album</p>
                        </div>

                        {/* SCRUBBER */}
                        <div className="w-full w-screen mt-10 px-20">
                            <div className="flex justify-between text-sm md:text-base mb-1">
                                <p>00:00</p>
                                <p>03:45</p>
                            </div>
                            <div className="glass h-2 w-full"></div>
                        </div>

                        {/* CONTROLS */}
                        <div className="musicControlBar w-full max-w-md mt-12 px-4">
                            <div className="flex justify-center items-center gap-6 md:gap-10">
                                <div className="Prev glass  flex justify-center items-center  w-10 h-10 md:w-14 md:h-14">
                                    <p className="flex justify-center items-center">
                                        P
                                        </p>
                                        </div>
                                <div className="Pause glass w-14 flex justify-center items-center h-14 md:w-20 md:h-20">
                                    <p>
                                        ||
                                        </p>
                                        </div>
                                <div className="Next glass  flex justify-center items-center w-10 h-10 md:w-14 md:h-14">
                                    <p>
                                        N
                                        </p>
                                         </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>


    )
}

export default Musicplayer
