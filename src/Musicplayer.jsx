import { useEffect, useRef, useState } from 'react';
import Galaxy from "./components/Galaxy.jsx";
import { useLocation } from "react-router-dom";

function Musicplayer() {
  const location = useLocation();
  const mood = location.state?.mood || "Energized";

  // Playlist will come from your backend
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // SoundCloud widget references
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);

  // 1️⃣ Initialize SoundCloud player when iframe mounts
  useEffect(() => {
    if (iframeRef.current && window.SC && !widgetRef.current) {
      widgetRef.current = window.SC.Widget(iframeRef.current);

      widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
        widgetRef.current.pause();
        setIsPlaying(false);
      });
    }
  }, []);

  // 2️⃣ Fetch recommended tracks from backend after mood is passed
  useEffect(() => {
    async function fetchSongs() {
      try {
        const token = localStorage.getItem("authToken");

        const resp = await fetch(
            `http://127.0.0.1:8000/api/recommendations/?mood=${mood}`,
            {
              headers: {
                "Authorization": `Token ${token}`
              }
            }
        );

        const data = await resp.json();

        if (data.songs && data.songs.length > 0) {
          setPlaylist(data.songs);
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error("Failed to fetch songs:", err);
      }
    }

    fetchSongs();
  }, [mood]);

  // 3️⃣ Load the current song into SoundCloud widget automatically
  useEffect(() => {
    if (!widgetRef.current) return;
    if (playlist.length === 0) return;

    const current = playlist[currentIndex];
    if (!current?.soundcloud_url) return;

    widgetRef.current.load(current.soundcloud_url, {
      auto_play: true,
      show_comments: false,
    });

    widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
    widgetRef.current.play();
    setIsPlaying(true);
  });

    setIsPlaying(true);
  }, [currentIndex, playlist]);

  // Controls
  function handlePlayPause() {
    if (!widgetRef.current) return;

    if (isPlaying) {
      widgetRef.current.pause();
      setIsPlaying(false);
    } else {
      widgetRef.current.play();
      setIsPlaying(true);
    }
  }

  function nextSong() {
    if (!playlist.length) return;
    setCurrentIndex((i) => (i + 1) % playlist.length);

  }

  function prevSong() {
    if (!playlist.length) return;
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);

  }

  const current = playlist[currentIndex];

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Galaxy background */}
      <Galaxy mouseRepulsion={false} mouseInteraction={false} />

      {/* Hidden SoundCloud iframe */}
      <iframe
        ref={iframeRef}
        title="soundcloud-player"
        style={{ display: "none" }}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https://soundcloud.com/partyomo/lasers"
      />

      <div className="w-full text-white">
        <div className="flex flex-col items-center px-4 mt-20">

          {/* Mood Display */}
          <div className="Nav glass mb-10 px-6 py-3 text-lg md:text-xl">
            <p className="font-bold">{mood}</p>
          </div>

          {/* Album Art */}
          <div className="musicPreview w-48 h-48 md:w-72 md:h-72 rounded-2xl overflow-hidden">
              <img
                src={current?.album_image}
                className="w-full h-full object-contain"
                alt="Album Art"
              />
                </div>


          {/* Song Info */}
          <div className="songInfo w-full max-w-md mt-10 text-center px-2">
            <p className="Title text-2xl md:text-4xl mb-3 font-bold">
              {current?.title || "Loading..."}
            </p>
            <p className="Name text-sm md:text-base font-light">
              {current?.artists || ""}
            </p>
            <p className="Album text-xs md:text-sm font-extralight mt-1 mb-5">
              {current?.album || ""}
            </p>
          </div>

          {/* Controls */}
          <div className="musicControlBar w-full max-w-md mt-12 px-4">
            <div className="flex justify-center items-center gap-6 md:gap-10">

              <button
                onClick={prevSong}
                className="Prev glass flex justify-center items-center w-10 h-10 md:w-14 md:h-14"
              >
                <p>P</p>
              </button>

              <button
                onClick={handlePlayPause}
                className="Pause glass w-14 flex justify-center items-center h-14 md:w-20 md:h-20"
              >
                {isPlaying ? "||" : "▶"}
              </button>

              <button
                onClick={nextSong}
                className="Next glass flex justify-center items-center w-10 h-10 md:w-14 md:h-14"
              >
                <p>N</p>
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Musicplayer;
