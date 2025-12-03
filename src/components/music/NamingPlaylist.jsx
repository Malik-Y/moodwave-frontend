export default function NamingPlaylist({
  open,
  newPlaylistName,
  setNewPlaylistName,
  setNewPlaylistDescription,
  setNamingPlaylist,
  handleSavePlaylist,
  playlistName,
    PlaylistDescription,

  mood,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
      <div className="glass p-6 rounded-2xl w-80 text-white text-center space-y-4">
        <h2 className="text-lg font-bold">Name Your Playlist</h2>

        <input
          type="text"
          placeholder={`${mood} Mix`}
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 focus:outline-none text-white"
        />
          <input
          type="text"
          placeholder={"Description"}
          value={PlaylistDescription}
          onChange={(e) => setNewPlaylistDescription(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 focus:outline-none text-white"
        />


        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              setNamingPlaylist(false);
              setNewPlaylistName("");
            }}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              handleSavePlaylist(newPlaylistName || playlistName || `${mood} Mix`, PlaylistDescription);
              setNamingPlaylist(false);
              setNewPlaylistName("");
            }}
            className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
