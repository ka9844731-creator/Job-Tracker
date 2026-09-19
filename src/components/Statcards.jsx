import React from "react";

export default function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-[#111827]">
      
      <div className="flex items-start justify-between">
        
        {/* TEXT */}
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>

        {/* ICON */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
          {Icon && (
            <Icon
              size={20}
              className="text-blue-600 dark:text-blue-400"
            />
          )}
        </div>
      </div>
    </div>
  );
}