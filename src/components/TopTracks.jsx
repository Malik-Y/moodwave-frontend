import SongCard from "./SongCard.jsx";

export default function TopTracks() {
    return (
        <div className="flex gap-4 justify-center px-5">
            <SongCard/>
            <SongCard/>
            <SongCard/>
        </div>
    );
}
