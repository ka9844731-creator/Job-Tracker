import { useEffect, useState } from "react";
import API from "../api";
import ApplicationProgress from "../components/ApplicationProgress";
import ApplicationChart from "../components/ApplicationsChart";

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/applications/stats");
        setStats(response.data);
      } catch (error) {
        console.error(
          "ANALYTICS ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="rounded-2xl border border-white/60 bg-white/75 p-6 shadow-lg backdrop-blur-md dark:border-slate-700/60 dark:bg-[#111827]/75">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Loading analytics...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
            Performance
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
            Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Understand your job search performance.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Metric
            title="Response Rate"
            value={`${stats?.responseRate ?? 0}%`}
            change="Live"
          />

          <Metric
            title="Interview Rate"
            value={`${stats?.interviewRate ?? 0}%`}
            change="Live"
          />

          <Metric
            title="Offer Rate"
            value={`${stats?.offerRate ?? 0}%`}
            change="Live"
          />

          <Metric
            title="Total Applications"
            value={stats?.total ?? 0}
            change="Live"
          />

        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur-md dark:border-slate-700/60 dark:bg-[#111827]/80">
            <ApplicationChart />
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur-md dark:border-slate-700/60 dark:bg-[#111827]/80">
            <ApplicationProgress />
          </div>

        </div>

      </div>
    </main>
  );
}


/* ========================================= */
/* METRIC CARD */
/* ========================================= */

function Metric({ title, value, change }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/60
        bg-white/85
        p-5
        shadow-lg
        backdrop-blur-md
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        dark:border-slate-700/60
        dark:bg-[#111827]/85
      "
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <div className="mt-2 flex items-end justify-between">

        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
          {value}
        </h2>

        <span
          className="
            rounded-full
            bg-emerald-50
            px-2
            py-1
            text-xs
            font-semibold
            text-emerald-600

            dark:bg-emerald-500/10
            dark:text-emerald-400
          "
        >
          {change}
        </span>

      </div>
    </div>
  );
}