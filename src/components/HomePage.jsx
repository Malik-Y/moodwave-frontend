import {useState} from "react";
import {useNavigate} from "react-router-dom";
import MoodOrbSection from "./MoodOrbSection.jsx";
import Tabs from "./Tabs.jsx";

const moods = ["Energized", "Calm", "Joyful", "Focused"];

const moodDescriptions = {
    Energized: "PUMPED UP & READY",
    Calm: "PEACEFUL & SERENE",
    Joyful: "BRIGHT • HAPPY VIBES",
    Focused: "LOCKED IN & ZONED",
};

function HomePage() {
    const navigate = useNavigate();
    const [mood, setMood] = useState("Energized");
    const [activeTab, setActiveTab] = useState("jumpin");
    const [collapsed, setCollapsed] = useState(true);
    const [focusMode, setFocusMode] = useState(true);

    function handleOrbClick() {
        navigate("/Musicplayer", {state: {mood}});
    }

    return (
        <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            <MoodOrbSection
                mood={mood}
                description={moodDescriptions[mood]}
                onOrbClick={handleOrbClick}
                focusMode={focusMode}
            />

            <Tabs
                mood={mood}
                moods={moods}
                activeTab={activeTab}
                collapsed={collapsed}
                setMood={setMood}
                setActiveTab={setActiveTab}
                setCollapsed={setCollapsed}
                setFocusMode={setFocusMode}
            />
        </div>
    );
}

export default HomePage;
