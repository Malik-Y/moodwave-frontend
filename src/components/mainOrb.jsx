import SongCard from './SongCard.jsx';
import {MoodOrb} from "./MoodOrb.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import StatsPanel from "./StatsPanel.jsx";

const moods = [
    {label: 'Energized'},
    {label: 'Calm'},
    {label: 'Joyful'},
    {label: 'Focused'},
];

const moodDescriptions = {
    Energized: "PUMPED UP & READY",
    Calm: "PEACEFUL & SERENE",
    Joyful: "BRIGHT • HAPPY VIBES",
    Focused: "LOCKED IN & ZONED",
};

function MainOrb() {
    const navigate = useNavigate();
    const [mood, setMood] = useState("Energized");
    const [activeTab, setActiveTab] = useState("jumpin");
    const [collapsed, setCollapsed] = useState(false);
    const [focusMode, setFocusMode] = useState(false);


    function handleOrbClick() {
        navigate("/Musicplayer", {state: {mood}});
    }

    return (
        <>
            <div className="w-full flex flex-col justify-center mt-20">

                {/* Orb + Mood Picker */}
                <div className="flex flex-col  items-center">

                    {/* ORB */}
                    {focusMode && (
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
                    )}
                    <div className="relative z-10 flex flex-col items-center">

                        <MoodOrb mood={mood} focus={focusMode} onClick={handleOrbClick}/>

                        {/* Mood Label Below Orb */}
                        <div className="glass-orb px-10  mb-10">
                            <div className="flex flex-col items-center justify-center">
                                <figcaption className="text-2xl font-semibold italic text-pink-200 mt-4">
                                    {mood}
                                </figcaption>
                                <figcaption className="mt-2 text-white/50 text-xl italic font-light">
                                    {moodDescriptions[mood]}
                                </figcaption>
                            </div>
                        </div>
                    </div>

                    {/* TABS + CONTENT */}
                    {!collapsed && (
                        <div className="glass h-auto overflow-hidden py-5  w-170">

                            {/* TAB BAR */}
                            <div className="w-full flex mb-5  justify-center gap-x-6 ">
                                <button
                                    className={`${activeTab === "tracks" ? "text-pink-300 font-bold" : "text-white/60"}`}
                                    onClick={() => setActiveTab("tracks")}
                                >
                                    Top Tracks
                                </button>

                                <button
                                    className={`${activeTab === "jumpin" ? "text-pink-300 font-bold" : "text-white/60"}`}
                                    onClick={() => setActiveTab("jumpin")}
                                >
                                    Jump In
                                </button>

                                <button
                                    className={`${activeTab === "stats" ? "text-pink-300 font-bold" : "text-white/60"}`}
                                    onClick={() => setActiveTab("stats")}
                                >
                                    Stats
                                </button>
                                <button
                                    className="text-white text-bold hover:text-white ml-15"
                                    onClick={() => {
                                        setCollapsed(true);
                                        setFocusMode(true);
                                    }}>
                                    ↓
                                </button>

                            </div>

                            {/* JUMP IN */}
                            {activeTab === "jumpin" && (
                                <>
                                    <h3 className=" text-3xl text-center text-white/70 font-bold mt-10 mb-4">
                                        How are you feeling today?
                                    </h3>
                                    <p className="text-center font-light text-white/60 text-sm">
                                        CHOOSE · FEEL · EXPERIENCE
                                    </p>

                                    <div className="flex flex-wrap justify-center mb-5 mt-15 gap-6">
                                        {moods.map((m) => (
                                            <button
                                                key={m.label}
                                                className="rounded-full px-6 py-3 text-md font-medium shadow-md hover:scale-105 transition-all text-white"
                                                onClick={() => {
                                                    setMood(m.label);
                                                    setCollapsed(true);
                                                    setFocusMode(true);
                                                }}
                                            >
                                                {m.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* TOP TRACKS */}
                            {activeTab === "tracks" && (
                                <div className="gap-x-4 justify-center items-center flex-row flex ">
                                    <SongCard/>
                                    <SongCard/>
                                    <SongCard/>
                                </div>
                            )}

                            {/* STATS */}
                            {activeTab === "stats" && (
                                <div className="flex justify-center w-full">
                                    <StatsPanel/>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* COLLAPSED MODE*/}
                {collapsed && (
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <div className="glass px-6 py-3 rounded-full flex gap-6 text-white/70 text-sm">
                            <button onClick={() => {
                                setActiveTab("tracks");
                                setCollapsed(false);
                                setFocusMode(false);
                            }}>
                                Top Tracks
                            </button>
                            <button onClick={() => {
                                setActiveTab("jumpin");
                                setCollapsed(false);
                                setFocusMode(false);
                            }}>
                                Jump In
                            </button>
                            <button onClick={() => {
                                setActiveTab("stats");
                                setCollapsed(false);
                                setFocusMode(false);
                            }}>
                                Stats
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}

export default MainOrb;
