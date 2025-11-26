import {useState} from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import MainOrb from './components/mainOrb.jsx';
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
            <div className="relative w-screen  h-screen overflow-hidden">
                <Galaxy
                    mouseRepulsion={false}
                    mouseInteraction={false}
                    density={2.5}
                    glowIntensity={0.5}
                    saturation={0.8}
                    hueShift={101}
                />


                <div className=" w-full text-white h-screen">
                    <div className='flex flex-col items-center '>
                        <div className='flex flex-col items-center justify-center mt-10 '>
                            <div
                                className=' flex justify-center items-center w-full max-w-[900px] gap-x-180 flex-row mb-20'>
                                <div className='Nav glass px-5 py-3'>
                                    <Link to='/'>
                                        <p className=' font-bold'>Back</p>
                                    </Link>
                                </div>

                                <div className='Nav glass px-10 py-5'>
                                    <p className='font-bold'>{mood} </p>
                                </div>

                                <div className='Nav px-5 py-3 glass'>
                                    <p className='Menu'>TL</p>
                                </div>

                            </div>

                            <div className='musicPreview w-80 h-80'></div>

                            <div className='flex flex-col items-center songInfo  w-120 mt-20 h-auto'>
                                <p className='Title text-4xl mb-5 mt-2  font-bold'>Lasers</p>
                                <p className='Name  font-light'>Pnd & Drake</p>
                                <p className='Album font-extralight mt-1 mb-5'>Album</p>
                            </div>

                            <div className='tracklist flex flex-row  justify-between gap-x-30'>
                                {/* */}
                                <div className='musicscrubber songInfo w-150 mt-15 h-4 '>
                                    <div className='mt-5 flex flex-row justify-between gap-x-30 mb-1'>
                                        <p className='startTime'>00:00</p>
                                        <p className='endTime'>03:45</p>
                                    </div>
                                </div>
                            </div>

                            <div className='musicControlBar w-auto h-auto  mt-20 '>
                                <div
                                    className='controlBar flex items-center flex-row justify-between gap-x-5 mt-5 px-5 mb-5'>
                                    <div className='Prev w-15 glass scale-85 h-15'>
                                    </div>
                                    <div className='Pause w-20 glass h-20'></div>
                                    <div className='Next w-15 scale-85 glass h-15'>
                                    </div>
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
