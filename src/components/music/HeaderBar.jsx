export default function HeaderBar({
  playlistId,
  playlistName,
  mood,
  immersiveMode,
  onBack,
}) {
  if (immersiveMode) return null;

  return (
    <>
      <div className="Nav glass mb-10 px-6 py-3 text-lg md:text-xl">
        <p className="font-bold">{playlistId ? playlistName : mood}</p>
      </div>

      <button
        onClick={onBack}
        className="absolute top-4 left-4 px-5 py-2 glass rounded-full text-white text-sm hover:bg-white/10 transition"
      >
        ←
      </button>
    </>
  );
}
