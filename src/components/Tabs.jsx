import MoodSelector from "./MoodSelector.jsx";
import TopTracks from "./TopTracks";
import StatsPanel from "./StatsPanel.jsx";

export default function Tabs({
    mood, moods, activeTab, collapsed,
    setMood, setActiveTab, setCollapsed, setFocusMode
}) {
    return (
        <div className="flex flex-col items-center mt-8">

            {/* EXPANDED MODE */}
            {!collapsed && (
                <div className="glass py-5 w-full max-w-xl overflow-hidden">

                    {/* TAB BAR */}
                    <div className="flex justify-center mb-4 text-white/70">
                        {["tracks", "jumpin", "stats"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={activeTab === tab ? "text-pink-300 font-bold" : ""}
                            >
                                {tab === "jumpin" ? "Mood" : tab === "tracks" ? "Top Tracks" : "Stats"}
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
                    {activeTab === "jumpin" && (
                        <MoodSelector
                            moods={moods}
                            setMood={setMood}
                            setCollapsed={setCollapsed}
                            setFocusMode={setFocusMode}
                        />
                    )}

                    {activeTab === "tracks" && <TopTracks/>}

                    {activeTab === "stats" && (
                        <div className="flex justify-center">
                            <StatsPanel/>
                        </div>
                    )}
                </div>
            )}

            {/* COLLAPSED MODE */}
            {collapsed && (
                <div className="glass px-6 py-3 rounded-full flex gap-6 text-white/70 text-sm">
                    <button onClick={() => openTab("tracks")}>Top Tracks</button>
                    <button onClick={() => openTab("jumpin")}>Mood</button>
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
