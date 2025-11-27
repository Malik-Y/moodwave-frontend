import MoodOrb from "./MoodOrb.jsx";

export default function MoodOrbSection({ mood, description, onOrbClick, focusMode }) {
    return (
        <div className="relative flex flex-col items-center justify-center mt-5">
            {focusMode && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
            )}

            <div className="relative z-10 flex flex-col items-center">
                <MoodOrb mood={mood} focus={focusMode} onClick={onOrbClick} />

                <div className="glass-orb px-10 mb-5">
                    <figcaption className="text-2xl font-semibold italic text-pink-200 mt-2">
                        {mood}
                    </figcaption>
                    <figcaption className="mt-2 text-white/50 text-xl italic font-light">
                        {description}
                    </figcaption>
                </div>
            </div>
        </div>
    );
}
