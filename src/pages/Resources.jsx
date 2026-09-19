import {
  FileText,
  BookOpen,
  ExternalLink,
  Code2,
} from "lucide-react";

const resources = [
  {
    title: "Resume",
    description:
      "Keep your latest resume ready for applications.",
    icon: FileText,
  },

  {
    title: "Interview Preparation",
    description:
      "Practice technical and behavioral interview questions.",
    icon: BookOpen,
  },

  {
    title: "DSA Practice",
    description:
      "Improve your problem solving before technical rounds.",
    icon: Code2,
  },
];

export default function Resources() {
  return (
    <main className="min-h-screen px-5 py-8 lg:px-8">

      <div className="mx-auto max-w-[1200px]">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mb-8">

          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
            Career Toolkit
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
            Resources
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Everything you need to stay prepared for your job search.
          </p>

        </div>


        {/* ========================================= */}
        {/* RESOURCE CARDS */}
        {/* ========================================= */}

        <div className="grid gap-5 md:grid-cols-3">

          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <div
                key={resource.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-white/60
                  bg-white/80
                  p-6
                  shadow-lg
                  backdrop-blur-md
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl

                  dark:border-slate-700/60
                  dark:bg-[#111827]/80
                "
              >

                {/* ICON */}

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600

                    dark:bg-indigo-500/10
                    dark:text-indigo-400
                  "
                >
                  <Icon size={20} />
                </div>


                {/* TITLE */}

                <h2 className="mt-5 font-semibold text-slate-900 dark:text-white">
                  {resource.title}
                </h2>


                {/* DESCRIPTION */}

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {resource.description}
                </p>


                {/* EXPLORE */}

                <button
                  className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-indigo-600
                    transition
                    hover:gap-3

                    dark:text-indigo-400
                  "
                >
                  Explore

                  <ExternalLink size={14} />
                </button>

              </div>
            );
          })}

        </div>

      </div>

    </main>
  );
}