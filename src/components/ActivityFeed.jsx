import { ArrowUpRight } from "lucide-react";
import { activities } from "../data/data";

export default function ActivityFeed() {
  return (
    <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Activity Feed
          </h2>

          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
            Latest updates from your applications.
          </p>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-indigo-600">
          See all
          <ArrowUpRight size={15} />
        </button>

      </div>

      <div className="mt-7 space-y-6">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="flex gap-3"
          >

            <div className="relative">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white">

                <img
                  src={activity.logo}
                  alt=""
                  className="h-5 w-5"
                />

              </div>

              {index !== activities.length - 1 && (
                <div className="absolute left-1/2 top-10 h-6 w-px -translate-x-1/2 bg-slate-100" />
              )}

            </div>

            <div className="flex-1">

              <p className="text-sm font-medium leading-5 text-slate-700 dark:text-slate-300">
                {activity.text}
              </p>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                {activity.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}