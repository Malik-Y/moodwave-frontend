export default function StatsBox({ stats }) {
  return (
    <div className="glass rounded-3xl p-6 mb-12">
      <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>

      <div className="flex justify-between text-white/80">
        <div className="text-center">
          <p className="text-3xl">{stats.total_tracks}</p>
          <p className="text-xs">Tracks Analyzed</p>
        </div>

        <div className="text-center">
          <p className="text-3xl capitalize">{stats.top_genre ?? "—"}</p>
          <p className="text-xs">Top Genre</p>
        </div>

        <div className="text-center">
          <p className="text-3xl">{stats.mood_distribution.length}</p>
          <p className="text-xs">Moods Found</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Mood Distribution</h3>

        <div className="space-y-2">
          {stats.mood_distribution.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span>{item.mood}</span>
              <span>{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
