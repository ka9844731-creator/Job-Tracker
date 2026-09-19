import { Check } from "lucide-react";

const tasks = [
  {
    text: "Apply to 2 new companies",
    done: true,
  },
  {
    text: "Prepare for Google interview",
    done: true,
  },
  {
    text: "Update your resume",
    done: false,
  },
];

export default function TodaysFocus() {
  return (
    <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Today's Focus
          </h2>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Stay consistent with your search.
          </p>
        </div>

        <span className="text-sm font-medium text-slate-500">
          2/3
        </span>

      </div>

      <div className="mt-6 space-y-4">

        {tasks.map((task) => (

          <div
            key={task.text}
            className="flex items-center gap-3"
          >

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${task.done
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-slate-300"
                }`}
            >
              {task.done && <Check size={12} />}
            </div>

            <span
              className={`text-sm ${task.done
                ? "text-slate-400 line-through dark:text-slate-600"
                : "font-medium text-slate-700 dark:text-slate-300"
                }`}
            >
              {task.text}
            </span>

          </div>

        ))}

      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">

        <p className="font-serif text-sm italic leading-6 text-slate-500 dark:text-slate-400">
          "Your future is created by what you do today, not tomorrow."
        </p>
      </div>

    </section>
  );
}