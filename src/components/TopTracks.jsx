import { useEffect, useState } from "react";
import SongCard from "./SongCard.jsx";
import { apiGet } from "./API.js";

export default function TopTracks() {
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/top-tracks/").then(({ ok, data, error }) => {
            if (!ok) {
                setError(error);
                return;
            }
            setTracks(data.top_tracks || []);
        });
    }, []);

    if (error) {
        return <p className="text-red-300 italic px-5">{error}</p>;
    }

    return (
        <div className="flex w-full gap-4 px-5 overflow-x-auto scroll-smooth scrollbar-none py-5 snap-x snap-mandatory">
            {tracks.length === 0 && (
                <p className="text-white/50 italic">Loading your favourite tracks...</p>
            )}
            {tracks.map(track => (
                <SongCard key={track.id} title={track.title} artists={track.artists} albumImage={track.album_image} />
            ))}
        </div>
    );
}