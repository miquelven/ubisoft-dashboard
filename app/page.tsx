import mockData from '../services/mockData.json';

export default function Home() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Ubisoft Game Analytics</h1>
        <p className="text-gray-500">Dashboard Overview</p>
      </header>

      <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Overview Cards */}
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Players</h2>
          <p className="text-4xl font-bold text-blue-600">
            {mockData.overview.totalPlayers.toLocaleString()}
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Active Users</h2>
          <p className="text-4xl font-bold text-green-600">
            {mockData.overview.activeUsers.toLocaleString()}
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Revenue</h2>
          <p className="text-4xl font-bold text-yellow-600">
            ${mockData.overview.revenue.toLocaleString()}
          </p>
        </div>

        {/* Games List */}
        <div className="col-span-full bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Active Games</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b dark:border-zinc-700">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Platform</th>
                  <th className="pb-3">Active Players</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockData.games.map((game) => (
                  <tr
                    key={game.id}
                    className="border-b last:border-0 dark:border-zinc-700"
                  >
                    <td className="py-3 font-medium">{game.name}</td>
                    <td className="py-3 text-gray-500">{game.platform}</td>
                    <td className="py-3">
                      {game.activePlayers.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          game.status === 'Live'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {game.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
