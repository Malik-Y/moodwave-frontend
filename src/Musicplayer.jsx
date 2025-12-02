import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Galaxy from "./components/Galaxy.jsx";

import HeaderBar from "./components/music/HeaderBar.jsx";
import AlbumArt from "./components/music/AlbumArt.jsx";
import SongInfo from "./components/music/SongInfo.jsx";
import MusicControls from "./components/music/MusicControls.jsx";
import QueueDrawer from "./components/music/QueueDrawer.jsx";
import NamePlaylist from "./components/music/NamingPlaylist.jsx";

function Musicplayer() {
    const location = useLocation();
    const navigate = useNavigate();

    const playlistId = location.state?.playlistId ?? null;
    const playlistName = location.state?.playlistName ?? null;
    const mood = playlistId ? null : location.state?.mood || "Energized";

    const [immersiveMode, setImmersiveMode] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [reloading, setReloading] = useState(false);
    const [playlistOpen, setPlaylistOpen] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const [namingPlaylist, setNamingPlaylist] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");

    const iframeRef = useRef(null);
    const widgetRef = useRef(null);


    /* 🎯 nextSong logic */
    const nextSong = () => {
        if (!playlist.length) return;
        setCurrentIndex((i) => (i + 1) % playlist.length);
    };

    const nextSongRef = useRef(nextSong);
    useEffect(() => {
        nextSongRef.current = nextSong;
    });

    /* Initialize Soundcloud */
    useEffect(() => {
        if (iframeRef.current && window.SC && !widgetRef.current) {
            widgetRef.current = window.SC.Widget(iframeRef.current);

            widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
                widgetRef.current.pause();
                setIsPlaying(false);

                widgetRef.current.bind(window.SC.Widget.Events.FINISH, () => {
                    console.log("⚡ FINISH fired — calling nextSong()");
                    nextSongRef.current();
                });
            });
        }
    }, []);

    /* Fetch playlist */
    useEffect(() => {
        async function loadMusic() {
            const token = localStorage.getItem("authToken");

            if (playlistId) {
                const resp = await fetch(
                    `http://127.0.0.1:8000/api/get-playlist/?id=${playlistId}`,
                    {headers: {Authorization: `Token ${token}`}}
                );
                const data = await resp.json();
                setPlaylist(data.tracks || []);
                setCurrentIndex(0);
                return;
            }

            const resp = await fetch(
                `http://127.0.0.1:8000/api/recommendations/?mood=${mood}`,
                {headers: {Authorization: `Token ${token}`}}
            );
            const data = await resp.json();
            setPlaylist(data.songs || []);
            setCurrentIndex(0);
        }

        loadMusic();
    }, [playlistId, mood]);

    /* Handle current song changing */
    useEffect(() => {
        if (!widgetRef.current || !playlist.length) return;

        const track = playlist[currentIndex];
        if (!track?.soundcloud_url) return;

        console.log("Loading:", track.soundcloud_url);

        widgetRef.current.load(track.soundcloud_url, {
            auto_play: false,
            show_comments: false,
        });

        widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
            widgetRef.current.play();
            setIsPlaying(true);
            setPlayerReady(true);
        });
    }, [currentIndex, playlist]);

    /* Reload recommendations */
    async function reloadRecommendations() {
        if (playlistId) return;

        setReloading(true);

        const token = localStorage.getItem("authToken");

        const resp = await fetch(
            `http://127.0.0.1:8000/api/recommendations/?mood=${mood}`,
            {headers: {Authorization: `Token ${token}`}}
        );
        const data = await resp.json();

        setPlaylist(data.songs || []);
        setCurrentIndex(0);

        if (widgetRef.current && data.songs?.length > 0) {
            widgetRef.current.load(data.songs[0].soundcloud_url, {
                auto_play: true,
                show_comments: false,
            });
            setIsPlaying(true);
            setReloading(false);
        }
    }

    /* Manual controls */
    const handlePlayPause = () => {
        if (!widgetRef.current) return;

        if (isPlaying) {
            widgetRef.current.pause();
            setIsPlaying(false);
        } else {
            widgetRef.current.play();
            setIsPlaying(true);
        }
    };

    const prevSong = () => {
        if (!playlist.length) return;
        setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
    };

    const current = playlist[currentIndex];

    /* Save playlist */
    async function handleSavePlaylist(name) {
        const token = localStorage.getItem("authToken");

        const resp = await fetch("http://127.0.0.1:8000/api/save-playlist/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                name: name,
                tracks: playlist,
            }),
        });

        const data = await resp.json();
        alert(
            data.status === "success"
                ? `Playlist saved as: ${data.playlist_name}`
                : "Failed to save playlist."
        );
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <Galaxy
                mouseRepulsion={false}
                mouseInteraction={false}
                density={2.5}
                glowIntensity={0.5}
                saturation={0.8}
                hueShift={101}
            />

            {/* SoundCloud player */}
            <iframe
                ref={iframeRef}
                style={{display: "none"}}
                allow="autoplay; encrypted-media;"
                src="https://w.soundcloud.com/player/?url=https://soundcloud.com/partyomo/lasers"
            />

            {!playerReady && (
                <div
                    className="w-screen h-screen flex items-center justify-center text-white absolute inset-0 z-50 bg-black/40 backdrop-blur-md">
                    <p className="text-white/70 text-xl animate-pulse">Loading Player...</p>
                </div>
            )}
            {reloading && (
                <div
                    className="w-screen h-screen flex items-center justify-center text-white absolute inset-0 z-50 bg-black/40 backdrop-blur-md">
                    <p className="text-white/70 text-xl animate-pulse">
                        Refreshing Recommendations…
                    </p>
                </div>
            )}

            <div className="w-full text-white">
                <div className="flex flex-col items-center px-4 mt-20">
                    {/* Header & back button */}
                    <HeaderBar
                        playlistId={playlistId}
                        playlistName={playlistName}
                        mood={mood}
                        immersiveMode={immersiveMode}
                        onBack={() => navigate("/")}
                    />

                    {/* Album Art */}
                    <AlbumArt
                        current={current}
                        immersiveMode={immersiveMode}
                        setImmersiveMode={setImmersiveMode}
                    />

                    {immersiveMode && (
                        <button
                            onClick={() => setImmersiveMode(false)}
                            className="mt-6 px-6 py-2 glass rounded-full text-sm text-white opacity-55 hover:bg-white/10 transition"
                        >
                            ✕ Exit Immersive Mode
                        </button>
                    )}

                    {/* Song Info */}
                    <SongInfo
                        current={current}
                        immersiveMode={immersiveMode}
                        playlistOpen={playlistOpen}
                        setPlaylistOpen={setPlaylistOpen}
                    />

                    {/* Controls */}
                    <MusicControls
                        immersiveMode={immersiveMode}
                        isPlaying={isPlaying}
                        togglePlayPause={handlePlayPause}
                        prevSong={prevSong}
                        nextSong={nextSong}
                        reloadRecommendations={reloadRecommendations}
                        playlistId={playlistId}
                    />

                    {/* Queue Drawer */}
                    <QueueDrawer
                        playlistOpen={playlistOpen}
                        playlist={playlist}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        setNamingPlaylist={setNamingPlaylist}
                    />

                    {/* Name Playlist Popup */}
                    <NamePlaylist
                        open={namingPlaylist}
                        newPlaylistName={newPlaylistName}
                        setNewPlaylistName={setNewPlaylistName}
                        setNamingPlaylist={setNamingPlaylist}
                        handleSavePlaylist={handleSavePlaylist}
                        playlistName={playlistName}
                        mood={mood}
                    />
                </div>
            </div>
        </div>
    );
}

export default Musicplayer;
