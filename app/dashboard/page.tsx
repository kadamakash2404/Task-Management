export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      {/* Loader */}
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-8"></div>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-cyan-400 mb-4">Dashboard</h1>

      {/* Coming Soon Text */}
      <p className="text-2xl mb-2">Coming Soon...</p>

      <p className="text-slate-300 text-lg text-center max-w-xl">
        We are currently building an advanced task management dashboard with
        analytics, task tracking, productivity insights, and more.
      </p>
    </div>
  );
}
