import { CalendarDays, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-b-[28px] bg-[#182230] text-white dark:rounded-b-[28px]">
      {/* Background */}

      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85"
        alt="mountains"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#101827] via-[#101827]/80 to-transparent" />

      {/* Content */}

      <div className="relative mx-auto flex min-h-[285px] max-w-[1500px] items-center px-6 py-12 lg:px-10">

        <div className="max-w-xl">

          <p className="mb-3 text-sm font-medium text-slate-300">
            MONDAY · SEPTEMBER 14, 2026
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Good evening, Karan 👋
          </h1>

          <p className="mt-5 max-w-lg font-serif text-lg italic leading-relaxed text-slate-300">
            "Small steps every day lead to big opportunities."
          </p>

          <p className="mt-2 text-xs text-slate-400">
            — Unknown
          </p>

        </div>

        {/* Interview floating card */}

        <div className="absolute right-8 top-1/2 hidden w-[300px] -translate-y-1/2 rounded-2xl border border-white/15 bg-[#182230]/90 p-5 shadow-2xl backdrop-blur-xl xl:block">

          <div className="flex items-start gap-3">

            <div className="rounded-xl bg-white/10 p-2.5">
              <CalendarDays size={19} />
            </div>

            <div className="flex-1">

              <p className="text-xs text-slate-400">
                Upcoming Interview
              </p>

              <p className="mt-1 font-medium">
                Frontend Intern · Google
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Tomorrow · 10:00 AM
              </p>

            </div>

            <ArrowRight
              size={18}
              className="mt-1 text-slate-400"
            />

          </div>

        </div>

      </div>

    </section>
  );
}