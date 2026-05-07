export default function SongInfo({
  current,
  immersiveMode,
  playlistOpen,
  setPlaylistOpen,
}) {
  return (
    <div
      className={`
        relative
        songInfo
        w-auto
        max-w-md
        mt-10
        text-center
        px-20
        transition-all
        duration-300
        ${immersiveMode
          ? "opacity-0 pointer-events-none translate-y-5"
          : "opacity-100"}
      `}
    >
      <p className="Title text-sm md:text-2xl mb-3 mt-5 font-bold">
        {current?.title || "Loading..."}
      </p>

      <p className="Name text-sm md:text-xl font-light">
        {current?.artists || ""}
      </p>

      <p className="Album text-xs md:text-sm font-extralight mt-1 mb-5">
        {current?.album || ""}
      </p>

      <button
        onClick={() => setPlaylistOpen(!playlistOpen)}
        className="
          absolute
          -left-12
          top-1/2
          -translate-y-1/2
          flex
          items-center
          justify-center
          rounded-full
          text-white
          text-xl
          hover:bg-white/10
          hover:scale-105
          transition-all
          duration-200
          z-40
          px-3
          py-2
        "
      >
        {playlistOpen ? "✕" : "≡"}
      </button>
    </div>
  );
}