import { ArrowRight, MapPin } from "lucide-react";
import { companies } from "../data/data";

export default function HiringCompanies() {
  return (
    <section className="overflow-hidden rounded-[22px] bg-[#111827] p-6 text-white">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold">
            Top Companies Hiring
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Opportunities worth checking out.
          </p>
        </div>

        <button className="text-xs font-medium text-indigo-300">
          See all
        </button>

      </div>

      <div className="mt-6 divide-y divide-white/10">

        {companies.map((company) => (

          <div
            key={company.name}
            className="group flex items-center gap-3 py-4 first:pt-0 last:pb-0"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">

              <img
                src={company.logo}
                alt=""
                className="h-6 w-6"
              />

            </div>

            <div className="min-w-0 flex-1">

              <p className="text-sm font-medium">
                {company.name}
              </p>

              <p className="mt-0.5 truncate text-xs text-slate-400">
                {company.role}
              </p>

              <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                <MapPin size={11} />
                {company.location}
              </div>

            </div>

            <ArrowRight
              size={16}
              className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-white"
            />

          </div>

        ))}

      </div>

    </section>
  );
}