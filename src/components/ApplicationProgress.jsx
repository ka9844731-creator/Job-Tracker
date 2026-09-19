import { useEffect, useState } from "react";
import API from "../api";

export default function ApplicationProgress() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/applications/stats");
        setStats(response.data);
      } catch (error) {
        console.error(
          "PROGRESS ERROR:",
          error.response?.data || error.message
        );
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
        <p className="text-sm text-slate-400">Loading progress...</p>
      </section>
    );
  }

  const data = [
    {
      name: "Applied",
      value: stats.applied,
      color: "text-blue-500",
    },
    {
      name: "Screening",
      value: stats.screening,
      color: "text-violet-500",
    },
    {
      name: "Interview",
      value: stats.interviews,
      color: "text-orange-500",
    },
    {
      name: "Offer",
      value: stats.offers,
      color: "text-emerald-500",
    },
    {
      name: "Rejected",
      value: stats.rejected,
      color: "text-red-500",
    },
  ];

  const total = stats.total;

  // Calculate donut percentages
  const appliedPercent = total
    ? (stats.applied / total) * 100
    : 0;

  const screeningPercent = total
    ? (stats.screening / total) * 100
    : 0;

  const interviewPercent = total
    ? (stats.interviews / total) * 100
    : 0;

  const offerPercent = total
    ? (stats.offers / total) * 100
    : 0;

  const p1 = appliedPercent;
  const p2 = p1 + screeningPercent;
  const p3 = p2 + interviewPercent;
  const p4 = p3 + offerPercent;

  return (
    <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Application Progress
          </h2>

          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
            Your current hiring funnel.
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-8">

        {/* Donut */}
        <div className="relative h-36 w-36 shrink-0">

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                #3b82f6 0 ${p1}%,
                #8b5cf6 ${p1}% ${p2}%,
                #f59e0b ${p2}% ${p3}%,
                #10b981 ${p3}% ${p4}%,
                #ef4444 ${p4}% 100%
              )`,
            }}
          />

          <div className="absolute inset-[14px] flex flex-col items-center justify-center rounded-full bg-white dark:bg-[#111827]">

            <span className="text-3xl font-semibold text-slate-900 dark:text-white">
              {total}
            </span>

            <span className="text-xs text-slate-400">
              Applications
            </span>

          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">

          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >

              <div className="flex items-center gap-2">

                <span
                  className={`h-2.5 w-2.5 rounded-full bg-current ${item.color}`}
                />

                <span className="text-slate-500 dark:text-slate-400">
                  {item.name}
                </span>

              </div>

              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {item.value}
              </span>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}