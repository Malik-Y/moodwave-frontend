import TextType from "../TextType.jsx";

export default function HeaderInfo({ info }) {
  return (
    <div className="text-center mb-10">
      <TextType
        text={["Welcome Back", info.username]}
        typingSpeed={95}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="_"
        className="text-5xl font-bold italic"
      />
      <p className="text-white/50 mt-1">
        {info.spotify_connected ? "Spotify Connected" : "Not Connected"}
      </p>
    </div>
  );
}
