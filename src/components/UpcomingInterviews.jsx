import {
  CalendarDays,
  Clock3,
  Video,
} from "lucide-react";

export default function UpcomingInterview() {
  return (
    <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
            Next Interview
          </p>

          <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Google
          </h2>

        </div>

        <img
          src="https://www.google.com/s2/favicons?domain=google.com&sz=128"
          alt="Google"
          className="h-9 w-9"
        />

      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">

        <p className="font-medium text-slate-800 dark:text-slate-200">
          Frontend Intern
        </p>

        <div className="mt-3 space-y-2">

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <CalendarDays size={14} />
            Tomorrow, Sep 15
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock3 size={14} />
            10:00 AM – 11:00 AM
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Video size={14} />
            Google Meet
          </div>

        </div>

      </div>

      <button className="mt-4 w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800">
        Prepare for interview
      </button>

    </section>
  );
}