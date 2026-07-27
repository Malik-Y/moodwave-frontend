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
    const [PlaylistDescription, setNewPlaylistDescription] = useState("");

    // Real React state (not just a ref) so the "song changing" effect
    // correctly re-runs once the widget becomes usable, instead of
    // silently doing nothing if playlist data arrives before the widget does.
    const [scReady, setScReady] = useState(false);

    const iframeRef = useRef(null);
    const widgetRef = useRef(null);

    const current = playlist[currentIndex];

    /* next song logic */
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
        let cancelled = false;
        let retryTimer = null;
        let isFirstReady = true;

        function trySetupWidget() {
            if (cancelled || widgetRef.current) return;

            // SoundCloud's widget script (w.soundcloud.com/player/api.js) is
            // loaded from a third-party domain and can arrive after this
            // component mounts, especially on slower connections. Keep
            // retrying instead of silently giving up.
            if (!iframeRef.current || !window.SC) {
                retryTimer = setTimeout(trySetupWidget, 200);
                return;
            }

            widgetRef.current = window.SC.Widget(iframeRef.current);
            setScReady(true);

            // Bound exactly once, for the widget's whole lifetime - the
            // widget re-fires READY every time .load() swaps in a new
            // track, so this handles every future track change too rather
            // than needing to be re-bound (and stacked) each time.
            widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
                if (isFirstReady) {
                    // This is the hidden placeholder track loaded at mount -
                    // just silence it, don't auto-play it.
                    isFirstReady = false;
                    widgetRef.current.pause();
                    setIsPlaying(false);
                    return;
                }

                widgetRef.current.play();
                setIsPlaying(true);
                setPlayerReady(true);
            });

            widgetRef.current.bind(window.SC.Widget.Events.FINISH, () => {
                console.log("⚡ FINISH fired — calling nextSong()");
                nextSongRef.current();
            });
        }

        trySetupWidget();

        return () => {
            cancelled = true;
            if (retryTimer) clearTimeout(retryTimer);
        };
    }, []);

    /* Fetch playlist */
    useEffect(() => {
        async function loadMusic() {
            const token = localStorage.getItem("authToken");

            if (playlistId) {
                const resp = await fetch(
                    `https://moodwave-6b5s.onrender.com/api/get-playlist/?id=${playlistId}`,
                    {headers: {Authorization: `Token ${token}`}}
                );
                const data = await resp.json();
                setPlaylist(data.tracks || []);
                setCurrentIndex(0);
                return;
            }

            const resp = await fetch(
                `https://moodwave-6b5s.onrender.com/api/recommendations/?mood=${mood}`,
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
        if (!playlist.length) return;

        const track = playlist[currentIndex];
        if (!track?.soundcloud_url) return;

        if (!scReady || !widgetRef.current) return;

        console.log("Loading:", track.soundcloud_url);

        widgetRef.current.load(track.soundcloud_url, {
            auto_play: false,
            show_comments: false,
        });
        // Playback + isPlaying/playerReady are handled by the READY
        // listener bound once in the SoundCloud init effect above.
    }, [currentIndex, playlist, scReady]);

    /* Reload recommendations - actual loading is handled by the
       "song changing" effect above once `playlist`/`currentIndex` update */
    async function reloadRecommendations() {
        if (playlistId) return;

        setReloading(true);

        const token = localStorage.getItem("authToken");

        const resp = await fetch(
            `https://moodwave-6b5s.onrender.com/api/recommendations/?mood=${mood}`,
            {headers: {Authorization: `Token ${token}`}}
        );
        const data = await resp.json();

        setPlaylist(data.songs || []);
        setCurrentIndex(0);
        setReloading(false);
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

    /* Save playlist */
    async function handleSavePlaylist(name, description) {

        const token = localStorage.getItem("authToken");

        const resp = await fetch("https://moodwave-6b5s.onrender.com/api/save-playlist/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                name: name,
                tracks: playlist,
                description: description,
            }),
        });

        const data = await resp.json();
        alert(
            data.status === 200
                ? `Playlist saved as: ${data.playlist_name}`
                : "Failed to save playlist."
        );
    }



    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
            <Galaxy
                mouseRepulsion={false}
                mouseInteraction={false}
                density={2.5}
                glowIntensity={0.5}
                saturation={0.8}
                hueShift={101}
            />
            </div>
            {/* SoundCloud player */}
            <iframe
                ref={iframeRef}
                style={{display: "none"}}
                allow="autoplay; encrypted-media;"
                src="https://w.soundcloud.com/player/?url=https://soundcloud.com/partyomo/lasers"
            />

            {!playerReady && (
                <div
                    className="w-screen h-screen flex items-center justify-center text-white absolute inset-0 z-50 bg-black/40 pointer-events-none backdrop-blur-md">
                    <p className="text-white/70 text-xl animate-pulse">Loading Player...</p>
                </div>
            )}
            {reloading && (
                <div
                    className="w-screen h-screen flex items-center justify-center text-white absolute inset-0 z-50 bg-black/40 pointer-events-none backdrop-blur-md">
                    <p className="text-white/70 text-xl animate-pulse">
                        Refreshing Recommendations…
                    </p>
                </div>
            )}

            <div className="w-full text-white relative z-20">
                  <div className="flex flex-col items-center px-4 mt-20 relative z-20">
                    {/* Header & back button */}
                    <HeaderBar
                        playlistId={playlistId}
                        playlistName={playlistName}
                        mood={mood}
                        immersiveMode={immersiveMode}
                        onBack={() => navigate("/")}
                    />

                    {/* Album Art */}
                      <div className="relative z-10">
                    <AlbumArt
                        current={current}
                        immersiveMode={immersiveMode}
                        setImmersiveMode={setImmersiveMode}
                    />
                      </div>

                    {immersiveMode && (
                        <button
                            onClick={() => setImmersiveMode(false)}
                            className="mt-6 px-6 py-2 glass rounded-full text-sm text-white opacity-55 hover:bg-white/10 transition"
                        >
                            ✕ Exit Immersive Mode
                        </button>
                    )}

                    {/* Song Info */}
                      <div className="relative z-30">
                    <SongInfo
                        current={current}
                        immersiveMode={immersiveMode}
                        playlistOpen={playlistOpen}
                        setPlaylistOpen={setPlaylistOpen}
                    /></div>

                    {/* Controls */}
                   <div className="relative z-50 pointer-events-auto">
                      <MusicControls
                        immersiveMode={immersiveMode}
                        isPlaying={isPlaying}
                        togglePlayPause={handlePlayPause}
                        prevSong={prevSong}
                        nextSong={nextSong}
                        reloadRecommendations={reloadRecommendations}
                        playlistId={playlistId}
                      />
                    </div>

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
                        setNewPlaylistDescription={setNewPlaylistDescription}
                        PlaylistDescription={PlaylistDescription}
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
