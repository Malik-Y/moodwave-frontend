import { useState } from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import MainOrb from './components/mainOrb.jsx';
import RandomLyric from "./components/RandomLyric.jsx";
import MoodSelector from "./components/MoodSelector.jsx";

function Login() {

    const [password, setPass] = useState("Forgot Password?");


        function handleClick () {

             let loggedIn=false;

             if (loggedIn === false){
                localStorage.setItem("loggedIn", "true");
                setPass("logged In");
                window.location.href = "/";
            }

 }

  return (
    <>
        <div className='mt-20 rounded-3xl backdrop-blur-3xl shadow-lg drop-shadow-2xl bg-pink-200/10 -z-10 overflow-hidden px-10 py-10 flex flex-col justify-start text-center '>
            <div className='header'>
                <div className='flex flex-col text-center'>
                <h1 className=' text-center  mb-1 italic text-purple-300 min title'>MoodWave</h1>
                <h2 className=' text-center italic text-white/50 text-sm font-light'>YOUR SAFE HAVEN</h2>
            </div>
            </div>
            <div className='p-8 md:p-10 relative overflow-hidden '>
                <div className='mx-auto mb-10 scale-85 z-1'>
                </div>
                    <div className='mainBod flex-col mt-20 scale-115 mb-10'>
                    <h2 className='mb-5 content-center mr-53 '>Email:</h2>
                    <input className='glass-input-card relative w-full mb-10'/>
                    <h3 className='mb-5 mr-50 content-center '>Password:</h3>
                    <input className='glass-input-card w-full flex-col mb-1 '/>
                    <p className='italic  mt-2 text-xs text-right px-45 '>{[password]}</p>
                    </div>

                <div className='flex-col '>
                    <button onClick={handleClick} className='login-button mt-10 mb-20'>Enter Your Dream Land</button>
                </div>

                <div className="flex items-center justify-center gap-2 ">
                      <p className="text-sm italic font-light">Don't have an account?</p>
                      <a className="text-sm underline italic" href="http://youtube.com">Create one</a>
                </div>

            </div>

        </div>
    </>


  )
}

export default Login
