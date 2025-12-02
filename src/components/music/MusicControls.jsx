export default function MusicControls({
  immersiveMode,
  isPlaying,
  togglePlayPause,
  prevSong,
  nextSong,
  reloadRecommendations,
  playlistId,
}) {
  return (
    <div
      className={`
        musicControlBar w-auto max-w-md mt-12 px-4 transition-all duration-300
        ${immersiveMode ? "opacity-0 pointer-events-none translate-y-6" : "opacity-100"}
      `}
    >
      <div className="flex justify-center items-center gap-6 mt-5 mb-5 md:gap-10">
        <button onClick={prevSong} className="Prev glass flex justify-center items-center w-10 h-10 md:w-14 md:h-14">
          <p>◀</p>
        </button>

        <button
          onClick={togglePlayPause}
          className="Pause glass w-14 flex justify-center items-center h-14 md:w-20 md:h-20"
        >
          {isPlaying ? "||" : "▶"}
        </button>

        <button onClick={nextSong} className="Next glass flex justify-center items-center w-10 h-10 md:w-14 md:h-14">
          <p>▶</p>
        </button>
      </div>

      {!playlistId && (
        <div className="flex justify-center mt-6">
          <button
            onClick={reloadRecommendations}
            className="px-5 py-2 mb-5 glass rounded-full text-sm hover:bg-white/80 transition"
          >
            ↻ Reload Recommendations
          </button>
        </div>
      )}
    </div>
  );
}
