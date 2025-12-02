import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Galaxy from "./components/Galaxy.jsx";

import TopBar from "./components/profile/TopBar.jsx";
import HeaderInfo from "./components/profile/HeaderInfo.jsx";
import StatsBox from "./components/profile/StatsBox.jsx";
import PlaylistGrid from "./components/profile/PlaylistGrid.jsx";

function Profile() {
  const navigate = useNavigate();

  const [info, setInfo] = useState(null);
  const [stats, setStats] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleLogout() {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("authToken");

      const headers = { Authorization: `Token ${token}` };

      const [infoResp, statsResp, playlistsResp] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/user-info/", { headers }),
        fetch("http://127.0.0.1:8000/api/user-stats/", { headers }),
        fetch("http://127.0.0.1:8000/api/user-playlists/", { headers }),
      ]);

      setInfo(await infoResp.json());
      setStats(await statsResp.json());
      setPlaylists((await playlistsResp.json()).playlists || []);

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-white">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="relative w-screen min-h-screen text-white overflow-hidden">
      <Galaxy mouseRepulsion={false} mouseInteraction={false} />

      <div className="relative z-10 p-6 md:p-10 max-w-4xl mx-auto">

        {/* Top Bar */}
        <TopBar onBack={() => navigate(-1)} onLogout={handleLogout} />

        {/* Username + Spotify status */}
        <HeaderInfo info={info} />

        {/* Stats */}
        <StatsBox stats={stats} />

        {/* Playlists */}
        <PlaylistGrid playlists={playlists} navigate={navigate} />

      </div>
    </div>
  );
}

export default Profile;
