import { useEffect, useState } from "react";
import SongCard from "./SongCard.jsx";
import { apiGet } from "./API.js";  //

export default function TopTracks() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        apiGet("http://127.0.0.1:8000/api/top-tracks/")
            .then(data => {
                console.log("API data:", data);
                setTracks(data.top_tracks || []);
            });
    }, []);

    return (
        <div className="flex w-auto gap-4 justify-center px-5">
            {tracks.length === 0 && (
                <p className="text-white/50 italic">Loading your mood tracks...</p>
            )}

            {tracks.map(track => (
                <SongCard
                    key={track.id}
                    title={track.title}
                    artists={track.artists}
                    albumImage={track.album_image}
                />
            ))}
        </div>
    );
}
