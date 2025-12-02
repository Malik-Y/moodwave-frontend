export default function QueueDrawer({
  playlistOpen,
  playlist,
  currentIndex,
  setCurrentIndex,
  setNamingPlaylist,
}) {
  return (
    <div
      className={`
        fixed top-0 px-4 right-0 h-full w-72 md:w-80
        glass backdrop-blur-xl border-l border-white/10
        transition-transform duration-300 overflow-y-auto z-30
        ${playlistOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="p-4 gap-x-15 flex-row flex text-white items-center text-lg font-bold border-b border-white/10">
        Queue

        <button
          onClick={() => setNamingPlaylist(true)}
          className="
            w-5 h-10 rounded-full flex items-center justify-center
            text-white text-xs glass hover:bg-white/10 hover:scale-105
            transition-all duration-200 z-40
          "
        >
          +
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {playlist.map((song, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`
              flex items-center gap-3 p-3 rounded-xl glass transition
              ${i === currentIndex ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}
            `}
          >
            <img
              src={song.album_image || null}
              alt={song.title}
              className="w-12 h-12 rounded-lg object-cover"
            />

            <div className="flex flex-col text-left overflow-hidden">
              <p className="text-white font-semibold truncate">{song.title}</p>
              <p className="text-white/70 text-sm truncate">{song.artists}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
