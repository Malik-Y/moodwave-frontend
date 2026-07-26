import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Galaxy from "./Galaxy.jsx";
import MoodOrb from "./MoodOrb.jsx";
import { motion } from "motion/react";
import { apiGet, apiPost } from "./API.js";

export default function LoadingScreen() {
    const navigate = useNavigate();
    const [progress, setProgress] = useState({ done: 0, total: 0 });

    useEffect(() => {
        let cancelled = false;

        async function runSync() {
            const { ok, error } = await apiPost("/api/mood-sync/", {});
            if (!ok) {
                console.error("mood-sync failed to start:", error);
                finish();
                return;
            }

            // poll until the backend reports it's done
            while (!cancelled) {
                const { ok: statusOk, data } = await apiGet("/api/sync-status/");

                if (!statusOk) break; // don't spin forever on a broken status check

                setProgress({ done: data.done, total: data.total });

                if (!data.in_progress) break;

                await new Promise(r => setTimeout(r, 1200));
            }

            finish();
        }

        async function finish() {
            localStorage.setItem("firstLoginComplete", "true");
            if (!cancelled) {
                navigate("/", { replace: true });
                window.location.reload();
            }
        }

        runSync();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
            <Galaxy mouseRepulsion={false} mouseInteraction={false} density={2} glowIntensity={0.7} saturation={0.8} hueShift={161} />

            <div className="relative z-10 -mt-10 mb-10">
                <MoodOrb mood="Loading" focus={true} />
            </div>

            <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-xl text-purple-200 tracking-wide italic z-10"
            >
                Getting to know you
            </motion.p>

            {progress.total > 0 && (
                <p className="text-sm text-purple-300/70 mt-2 z-10">
                    Analyzed {progress.done} of {progress.total} songs
                </p>
            )}

            <div className="flex gap-2 mt-4 z-10">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
                        className="w-2 h-2 rounded-full bg-purple-300"
                    />
                ))}
            </div>
        </div>
    );
}