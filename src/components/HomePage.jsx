import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { User } from "lucide-react";
import MoodOrbSection from "./MoodOrbSection.jsx";
import Tabs from "./Tabs.jsx";
import moodDescriptions from "./moodDescription.js";


function HomePage() {
    const navigate = useNavigate();
    const [moods, setMoods] = useState([]);
    const [mood, setMood] = useState("Ambient");
    const [activeTab, setActiveTab] = useState("jumpin");
    const [collapsed, setCollapsed] = useState(true);
    const [focusMode, setFocusMode] = useState(true);

    useEffect(() => {
        async function fetchMoods() {
            const token = localStorage.getItem("authToken");
            const resp = await fetch("http://127.0.0.1:8000/api/user-info/", {
                headers: { "Authorization": `Token ${token}` }
            });

            const data = await resp.json();
            setMoods([...new Set(data.moods)]);

        }

        fetchMoods();
    }, []);

    function handleOrbClick() {
        navigate("/Musicplayer", {state: {mood}});
    }

    return (
        <div className={`{w-full max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 lg:px-16 ${focusMode ? "max-w-xl mt-30" : "max-w-screen-lg mt-10"}`} >
            <button
                onClick={() => navigate("/profile")}
                className="absolute top-4 right-4 glass rounded-full p-2 hover:bg-white/10 transition"
            >
                <User className="w-6 h-6 text-white" />
            </button>

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
                description={moodDescriptions[mood]}
                setMood={setMood}
                setActiveTab={setActiveTab}
                setCollapsed={setCollapsed}
                setFocusMode={setFocusMode}
            />
        </div>
    );
}

export default HomePage;
