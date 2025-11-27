export default function MoodSelector({moods, setMood, setCollapsed, setFocusMode}) {
    return (
        <>
            <h3 className="text-3xl text-center text-white/70 font-bold mt-10 mb-4">
                How are you feeling today?
            </h3>
            <p className="text-center font-light text-white/60 text-sm">
                CHOOSE · FEEL · EXPERIENCE
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
                {moods.map((m) => (
                    <button
                        key={m}
                        className="rounded-full px-6 py-3 text-md font-medium text-white shadow-md hover:scale-105 transition-all"
                        onClick={() => {
                            setMood(m);
                            setCollapsed(true);
                            setFocusMode(true);
                        }}
                    >
                        {m}
                    </button>
                ))}
            </div>
        </>
    );
}

