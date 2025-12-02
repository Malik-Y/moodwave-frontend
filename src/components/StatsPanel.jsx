import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function StatsPanel({ onAnalyzeMoreSongs }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = [
    "#a855f7",
    "#ec4899",
    "#8b5cf6",
    "#d946ef",
    "#c026d3",
    "#9333ea",
  ];

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem("authToken");

        const resp = await fetch("http://127.0.0.1:8000/api/user-stats/", {
          headers: { Authorization: `Token ${token}` },

        });

        const data = await resp.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
      setLoading(false);
    }

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-white/70 text-center">Loading...</p>;
  }

  if (!stats || stats.total_tracks === 0) {
    return (
      <div className="text-center text-white/70">
        <p>No analyzed tracks yet.</p>
        <button
          onClick={onAnalyzeMoreSongs}
          className="mt-4 px-6 py-3 bg-purple-600/40 hover:bg-purple-600/60
                     border border-purple-400/40 rounded-xl text-white"
        >
          Analyze Songs
        </button>
      </div>
    );
  }

  const chartData = stats.mood_distribution.map((m) => ({
    name: m.mood,
    value: m.percentage,
  }));

  const dominantMood = stats.mood_distribution.reduce((prev, cur) =>
    prev.percentage > cur.percentage ? prev : cur
  );

  return (
    <div className="w-full max-w-2xl mx-auto text-white space-y-6 px-6">

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h2 className="text-white">Your Music DNA</h2>
        <p className="text-purple-300/60 text-sm tracking-wider">
          {stats.total_tracks} TRACKS ANALYZED
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto">

        {/* MOOD DONUT */}
        <div className="bg-purple-950/30 rounded-3xl p-4 backdrop-blur-sm border border-purple-500/20">
          <h2 className="text-white text-center mb-6">Mood Breakdown</h2>

          <div className="flex items-center justify-center mt-15 gap-4">

            {/* PIE CHART */}
            <div className="w-[50%]">
              <ResponsiveContainer width="100%" height={120}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    paddingAngle={1}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* LEGEND */}
            <div className="flex flex-col gap-3 w-[45%]">
              {stats.mood_distribution.map((m, index) => (
                <div key={m.mood} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                  <span className="text-sm text-white/80">{m.mood}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT SIDE STATS */}
        <div className="space-y-4">

          {/* Dominant Mood */}
          <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30
                          rounded-3xl p-4 backdrop-blur-sm border border-purple-500/30">
            <p className="text-purple-300/70 text-xs tracking-wider mb-2">
              DOMINANT MOOD
            </p>
            <h3 className="text-white text-xl font-bold mb-3">
              {dominantMood.mood}
            </h3>
            <div className="flex justify-center text-xs gap-2">
              <span className="italic">{dominantMood.percentage}%</span>
              <span className="italic">OF YOUR SONGS</span>
            </div>
          </div>

          {/* Top Genre */}
          <div className="bg-purple-950/30 rounded-3xl p-4 backdrop-blur-sm
                          border border-purple-500/20">
            <p className="text-purple-300/70 text-xs tracking-wider mb-2">
              TOP GENRE
            </p>
            <h3 className="text-white text-xl font-bold capitalize">
              {stats.top_genre || "Unknown"}
            </h3>
          </div>

          {/* Analyze More Songs */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onAnalyzeMoreSongs}
              className="px-6 py-3 bg-purple-600/40 hover:bg-purple-600/60
                         border border-purple-400/40 text-white font-semibold
                         rounded-2xl backdrop-blur-md shadow-lg transition active:scale-95"
            >
              Analyze More Songs
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
