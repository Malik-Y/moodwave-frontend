import { useNavigate } from "react-router-dom";
import Galaxy from "./components/Galaxy.jsx";
import "./App.css";

function SpotifyAuth() {
  const navigate = useNavigate();

  async function handleSpotify() {
    const token = localStorage.getItem("authToken");

    const response = await fetch("http://127.0.0.1:8000/api/spotify/start/", {
      headers: {
        "Authorization": `Token ${token}`
      }
    });

    const data = await response.json();
    window.location.href = data.spotify_url;

  }

  return (
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

        {/* Header */}
        <div className='flex flex-col text-center'>
          <h1 className='text-center mb-1 italic text-purple-300 title'>
            MoodWave
          </h1>
          <h2 className='text-center italic text-white/50 text-sm font-light'>
            YOUR SAFE HAVEN
          </h2>
        </div>

        <div className='p-8 md:p-10 flex flex-col items-center text-center'>

          <h2 className="text-2xl italic text-white mb-6">
            Connect Your Spotify Account
          </h2>

          <p className="text-white/70 mb-8 max-w-lg">
            To give you personalized moods, playlists, and recommendations,
            we need access to your Spotify listening data. This lets MoodWave
            generate your vibe profile and top tracks.
          </p>

          <button
            onClick={handleSpotify}
            className="login-button mt-5 px-10 py-3"
          >
            Connect with Spotify
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpotifyAuth;
