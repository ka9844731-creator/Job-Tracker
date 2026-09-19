import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
} from "lucide-react";
import API from "../api";

export default function ApplicationChart() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.get("/applications");
        setApplications(response.data);
      } catch (error) {
        console.error(
          "CHART ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const data = useMemo(() => {
    const now = new Date();

    const months = [];

    // Last 6 months including current month
    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      months.push({
        month: date.toLocaleString("en-US", {
          month: "short",
        }),
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
        applications: 0,
      });
    }

    applications.forEach((app) => {
      const appDate = new Date(app.date || app.createdAt);

      const matchingMonth = months.find(
        (item) =>
          item.year === appDate.getFullYear() &&
          item.monthIndex === appDate.getMonth()
      );

      if (matchingMonth) {
        matchingMonth.applications++;
      }
    });

    return months;
  }, [applications]);

  const maxValue = Math.max(
    ...data.map((item) => item.applications),
    1
  );

  const currentMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];

  const currentCount = currentMonth?.applications || 0;
  const previousCount = previousMonth?.applications || 0;

  let growth = 0;

  if (previousCount > 0) {
    growth = Math.round(
      ((currentCount - previousCount) / previousCount) * 100
    );
  } else if (currentCount > 0) {
    growth = 100;
  }

  if (loading) {
    return (
      <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <p className="text-sm text-slate-400">
          Loading application activity...
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>
          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <BarChart3 size={18} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Application Activity
              </h3>

              <p className="text-xs text-slate-400 dark:text-slate-500">
                Applications submitted over time
              </p>
            </div>

          </div>
        </div>

        {/* Growth */}
        <div
          className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold ${
            growth >= 0
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
          }`}
        >
          <TrendingUp size={13} />

          {growth >= 0 ? "+" : ""}
          {growth}%
        </div>

      </div>

      {/* Chart */}
      <div className="mt-8">

        <div className="flex h-64 items-end gap-3 sm:gap-5">

          {data.map((item) => {

            const height =
              (item.applications / maxValue) * 100;

            return (
              <div
                key={`${item.month}-${item.year}`}
                className="group flex h-full flex-1 flex-col justify-end"
              >

                {/* Number */}
                <div className="mb-2 text-center text-xs font-semibold text-slate-500 opacity-0 transition group-hover:opacity-100 dark:text-slate-400">
                  {item.applications}
                </div>

                {/* Bar */}
                <div className="relative flex h-full items-end">

                  <div
                    style={{
                      height: `${height}%`,
                    }}
                    className="w-full rounded-t-xl bg-indigo-500 transition-all duration-500 group-hover:bg-indigo-600 dark:bg-indigo-500 dark:group-hover:bg-indigo-400"
                  />

                </div>

                {/* Month */}
                <p className="mt-3 text-center text-xs font-medium text-slate-400 dark:text-slate-500">
                  {item.month}
                </p>

              </div>
            );
          })}

        </div>
      </div>

      {/* Bottom information */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">

        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            This month
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            {currentCount} applications
          </p>
        </div>

        <div className="text-right">

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Previous month
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            {previousCount} applications
          </p>

        </div>

      </div>

    </section>
  );
}