export function StatsPanel() {
    return (
        <div className="w-full text-white space-y-3 px-4">

            {/* HEADER */}
            <section className="text-center space-y-0">
                <h2 className="text-xl font-bold">Your Music DNA</h2>
                <p className="text-[10px] text-white/60">INSIGHTS</p>
            </section>

            {/* MOOD DISTRIBUTION*/}
            <section className="space-y-1">
                <h3 className="text-sm font-semibold">Mood Distribution</h3>

                <div className="space-y-2">
                    {[
                        {mood: "Energized", percentage: 35},
                        {mood: "Calm", percentage: 25},
                        {mood: "Joyful", percentage: 20},
                        {mood: "Focused", percentage: 20},
                    ].map((m) => (
                        <div key={m.mood} className="space-y-1">

                            {/* Labels */}
                            <div className="flex justify-between text-xs">
                                <span>{m.mood}</span>
                                <span>{m.percentage}%</span>
                            </div>

                            {/* Bar */}
                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-pink-300 rounded-full"
                                    style={{width: `${m.percentage}%`}}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SMALL STATS GRID */}
            <section>
                <div className=" flex flex-col grid-cols-2 gap-3">

                    <div className="p-2 rounded-lg bg-white/10  ">
                        <h4 className="text-lg font-bold">R&B</h4>
                        <p className="text-[10px] text-white/60">Top Genre</p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default StatsPanel;