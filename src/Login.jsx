import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import './App.css'
import Header from "./components/Header.jsx";
import HomePage from './components/HomePage';
import RandomLyric from "./components/RandomLyric.jsx";
import MoodSelector from "./components/MoodSelector.jsx";
import Galaxy from "./components/Galaxy.jsx";

function Login() {
    const navigate = useNavigate();


    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


   async function handleLogin() {
  try {
    setError("");

    const response = await fetch("http://127.0.0.1:8000/login/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: Username,
        password: password,
      }),
    });

    if (!response.ok) {
      setError("Invalid username or password");
      return;
    }

    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    localStorage.removeItem("firstLoginComplete");

    // Check if Spotify is connected
    const statusResp = await fetch("http://127.0.0.1:8000/api/user-info/", {
      headers: { "Authorization": `Token ${data.token}` },
    });

    const statusData = await statusResp.json();

    if (!statusData.spotify_connected) {
      navigate("/connect-spotify");
      return;
    }

    navigate("/loading");

  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  }
}





    return (
        <>
            <div className="relative w-screen min-h-screen overflow-x-hidden flex justify-center items-center">
                <Galaxy

                    mouseRepulsion={true}
                    mouseInteraction={false}
                    density={2.5}
                    glowIntensity={0.5}
                    saturation={0.8}
                    hueShift={101}
                />
                <div className="max-w-3xl w-full mx-auto mt-10 mb-10 px-10 py-10
                        rounded-3xl backdrop-blur-3xl shadow-lg bg-pink-200/40
                        relative z-10">
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

                            <p className="text-red-400 italic text-sm mb-5">{error}</p>

                            <h2 className='mb-5 mt-5 content-center mr-53 '>Username:</h2>

                            <input required={true}
                                   type="text"
                                   className="glass-input-card relative w-full mb-10"
                                   value={Username}
                                   onChange={(e) => setUsername(e.target.value)}
                            />

                            <h3 className='mb-5 mr-50 content-center '>Password:</h3>

                            <input required={true}
                                   type="password"
                                   className="glass-input-card w-full flex-col mb-1"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                            />

                            <p className='italic mt-2 text-xs text-right px-45 '>Forgot Password?</p>
                        </div>

                        <div className='flex-col w-auto h-auto'>
                            <button onClick={handleLogin} className='login-button mt-10 mb-20'>Enter Your Dream Land
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-2 ">
                            <p className="text-sm italic font-light">Don't have an account?</p>
                            <a className="text-sm underline italic" href="/signup">Create one</a>

                        </div>

                    </div>

                </div>
            </div>
        </>


    )
}

export default Login
