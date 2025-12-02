import { Music, Lock, Play } from "lucide-react";

export default function PlaylistCard({ playlist, navigate }) {
  return (
    <div
      onClick={() =>
        navigate("/Musicplayer", {
          state: { playlistId: playlist.id, playlistName: playlist.name },
        })
      }
      className="cursor-pointer glass rounded-3xl p-5 hover:bg-white/10 transition relative overflow-hidden"
    >
      <div className="rounded-2xl overflow-hidden mb-4">
        <img
          src={playlist.cover || playlist.first_track_image || ""}
          className="w-full h-40 object-cover"
        />
      </div>

      <h3 className="text-xl font-semibold truncate">{playlist.name}</h3>

      <div className="flex items-center justify-between text-sm text-white/60 mt-1">
        <div className="flex items-center gap-1">
          <Music className="w-4 h-4" /> {playlist.trackCount}
        </div>

        {playlist.private && <Lock className="w-4 h-4" />}
      </div>

      <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center rounded-3xl transition">
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
          <Play className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}
