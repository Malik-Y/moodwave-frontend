import MoodSelector from "./MoodSelector.jsx";
import TopTracks from "./TopTracks";
import StatsPanel from "./StatsPanel.jsx";
import {useNavigate} from "react-router-dom";
import moodDescriptions from "./moodDescription.js";

export default function Tabs({mood, moods, activeTab, collapsed, setMood, setActiveTab, setCollapsed, setFocusMode})
{
const navigate = useNavigate();

    async function startSync() {
        navigate("/loading")

        const token = localStorage.getItem("authToken");

        await fetch("http://127.0.0.1:8000/api/mood-sync/", {
            method: "POST",
            headers: {"Authorization": `Token ${token}`},
        });



    }

    return (
        <div className="flex flex-col items-center mt-8">

            {/* EXPANDED MODE */}
            {!collapsed && (
                <div className="glass py-5 w-full w-auto overflow-hidden">

                    {/* TAB BAR */}
                    <div className="flex justify-center mb-4 text-white/70">
                        {["tracks", "mood", "stats"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={activeTab === tab ? "text-pink-300 font-bold" : ""}
                            >
                                {tab === "mood" ? "Mood" : tab === "tracks" ? "Top Tracks" : "Stats"}
                            </button>
                        ))}

                        <button
                            className="ml-8"
                            onClick={() => {
                                setCollapsed(true);
                                setFocusMode(true);
                            }}
                        >
                            ↓
                        </button>
                    </div>

                    {/* TAB CONTENT */}
                    {activeTab === "mood" && (
                        <MoodSelector
                            mood={mood}
                            moods={moods}
                            setMood={setMood}
                            moodDescriptions={moodDescriptions}
                            setCollapsed={setCollapsed}
                            setFocusMode={setFocusMode}
                        />

                    )}

                    {activeTab === "tracks" && <TopTracks/>}

                    {activeTab === "stats" && (
                        <div className="flex overflow-hidden justify-center">
                            <StatsPanel onAnalyzeMoreSongs={startSync}/>
                        </div>
                    )}
                </div>
            )}

            {/* COLLAPSED MODE */}
            {collapsed && (
                <div className="glass px-6 py-3 rounded-full flex gap-6 text-white/70 text-sm z-50">
                    <button onClick={() => openTab("tracks")}>Top Tracks</button>
                    <button onClick={() => openTab("mood")}>Mood</button>
                    <button onClick={() => openTab("stats")}>Stats</button>
                </div>
            )}
        </div>
    );

    function openTab(tab) {
        setActiveTab(tab);
        setCollapsed(false);
        setFocusMode(false);
    }
}
