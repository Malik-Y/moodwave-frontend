import PlaylistCard from "./PlaylistCard.jsx";

export default function PlaylistGrid({ playlists, navigate }) {
  return (
    <>
      <h2 className="text-3xl font-bold italic mb-4">Your Playlists</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {playlists.map((p) => (
          <PlaylistCard key={p.id} playlist={p} navigate={navigate} />
        ))}
      </div>
    </>
  );
}
