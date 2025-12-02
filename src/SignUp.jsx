import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './App.css';
import Galaxy from "./components/Galaxy.jsx";

function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSignup() {
        try {
            // 1. Login to Django
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),

            });

            if (!response.ok) {
                setError("Invalid credentials");
                return;
            }

            const data = await response.json();
            localStorage.setItem("authToken", data.token);
            localStorage.removeItem("firstLoginComplete");


            //Check with backend if Spotify is connected
            const statusResp = await fetch("http://127.0.0.1:8000/api/user-info/", {
                headers: {
                    "Authorization": `Token ${data.token}`
                }
            });

            const statusData = await statusResp.json();

            if (!statusData.spotify_connected) {
                navigate("/connect-spotify");
            } else {
                navigate("/loading");
            }

        } catch (err) {
            setError("Something went wrong");
        }
    }

    return (<div className="relative w-screen min-h-screen overflow-x-hidden flex justify-center items-center">
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

                <div className='flex flex-col text-center'>
                    <h1 className='text-center mb-1 italic text-purple-300 title'>
                        MoodWave
                    </h1>
                    <h2 className='text-center italic text-white/50 text-sm font-light'>
                        YOUR SAFE HAVEN
                    </h2>
                </div>

                <div className='p-8 md:p-10 relative overflow-hidden'>
                    <p className="text-red-400 italic text-sm mb-5">{error}</p>

                    <div className='mainBod flex-col mt-20 scale-115 mb-10'>
                        <h2 className='mb-5 mt-5'>Username:</h2>
                        <input
                            required
                            type="text"
                            className="glass-input-card w-full mb-10"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />


                        <h3 className='mb-5'>Password:</h3>
                        <input
                            required
                            type="password"
                            className="glass-input-card w-full mb-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='flex-col w-auto h-auto'>
                        <button
                            onClick={handleSignup}
                            className='login-button mt-10 mb-20'
                        >
                            Sign up
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <p className="text-sm italic font-light">Already have an account?</p>
                        <a className="text-sm underline italic" href="/login">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </div>);
}

export default Signup;
