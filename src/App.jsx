import { useState } from 'react'
import Orb from './assets/orb.png'
import './App.css'

const moods = [
  { label: 'Energized'},
  { label: 'Calm'},
  { label: 'Joyful'},
  { label: 'Focused' },
];

function App() {

  return (
    <>


        <div className='relative min-h-screen min-w-screen overflow-hidden flex flex-col justify-start text-center z-10 px-4 md:px-8 py-10 '>
            <h1 className=' logo text-center mb-3 md:text-8xl text-7xl italic text-purple-300 align-text-top title'>MoodWave</h1>
            <h2 className=' text-center italic text-white/50 text-sm font-light'>YOUR SAFE HAVEN</h2>
            {/*Section 1:Welcome and Orb*/}



                {/*Center of this section*/}


                        <img className='orb max-w-lg scale-50 logo react mt-10 mx-auto' src={Orb} alt='Orb'/>

                        <figcaption className="text-2xl font-semibold text-shadow: 0 0 10px title  italic text-pink-200">Energized</figcaption>
                        <figcaption className="mt-2 text-white/50 text-2xl italic font-light">PUMPED & READY</figcaption>



                    <p className='text-center italic font-semibold animate-pulse text-3xl mt-40 to-amber-100 mb-20 text-amber-50'>"Haaaaleyyyy"</p>



            {/*Section 2:Emotion Picking*/}

            <div className='flex flex-col justify-start relative px-4 md:px-8 py-25'>

                <h3 className='italic text-4xl text-center text-white/60 font-bold opacity-80 mb-5'>How are you feeling today?</h3>
                <p className='text-center font-light text-white/60 capitalize text-sm'>CHOOSE ~ FEEL ~ EXPERIENCE</p>

                {/*Center of this section*/}

                <div className='flex flex-wrap justify-center mt-30 gap-6'>
                    {moods.map((mood) => (
                        <button

                          key={mood.label}
                          className={'rounded-full px-6 py-3 text-lg font-medium shadow-md hover:scale-105 transform transition-all duration-300  animate-bounce    text-white'}
                        >
                          {mood.label}

                        </button>
                    ))}
                </div>


            </div>

            {/*Section 3:Playlists
                                <div className='relative flex flex-col justify-center text-center z-10 min-h-screen px-4 md:px-8 py-10'></div>
*/}




        </div>
    </>


  )
}

export default App
