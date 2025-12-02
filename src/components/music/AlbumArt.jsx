export default function AlbumArt({ current, immersiveMode, setImmersiveMode }) {
  return (
    <div
      className={`
        transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden
        ${immersiveMode
          ? "w-[90vw] h-[90vw] md:w-[65vh] md:h-[65vh] mt-25"
          : "w-88 h-88 md:w-120 md:h-120"}
      `}
      onClick={() => setImmersiveMode(true)}
    >
      <img
        src={current?.album_image || null}
        alt="Album Art"
        className={`
          w-full h-full object-contain transition-all duration-500
          ${immersiveMode ? "scale-110 opacity-70" : "scale-100 opacity-100"}
        `}
      />
    </div>
  );
}
