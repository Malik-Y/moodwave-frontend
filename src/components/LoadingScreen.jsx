import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Galaxy from "./Galaxy.jsx";
import MoodOrb from "./MoodOrb.jsx";
import {motion} from "motion/react";

export default function LoadingScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        async function runSync() {
            const token = localStorage.getItem("authToken");

            await fetch("http://127.0.0.1:8000/api/mood-sync/", {
                method: "POST",
                headers: {"Authorization": `Token ${token}`},
            });
            await fetch("http://127.0.0.1:8000/api/user-info/", {
                headers: {Authorization: `Token ${token}`}
            });

            localStorage.setItem("firstLoginComplete", "true");
            navigate("/", { replace: true });
            window.location.reload();


        }
        runSync();
    }, []);


    return (
        <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
            <Galaxy
                mouseRepulsion={false}
                mouseInteraction={false}
                density={2}
                glowIntensity={0.7}
                saturation={0.8}
                hueShift={161}
            />

            <div className="relative z-10 -mt-10 mb-10">
                <MoodOrb mood="Loading" focus={true}/>
            </div>

            <motion.p
                initial={{opacity: 0, y: 15}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                className="text-xl text-purple-200 tracking-wide italic z-10"
            >
                Getting to know you
            </motion.p>

            <div className="flex gap-2 mt-4 z-10">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{opacity: [0.3, 1, 0.3]}}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            delay: i * 0.25,
                        }}
                        className="w-2 h-2 rounded-full bg-purple-300"
                    />
                ))}
            </div>
        </div>
    );
}
