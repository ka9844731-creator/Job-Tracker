import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  ExternalLink,
  FileText,
  Briefcase,
  Loader2,
  ChevronRight,
} from "lucide-react";
import API from "../api";

export default function Interviews() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get("/applications");
      setApplications(response.data);
    } catch (error) {
      console.error(
        "INTERVIEWS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Only applications with Interview status
  const interviewApplications = applications.filter(
    (application) => application.status === "Interview"
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingInterviews = interviewApplications
    .filter((application) => {
      if (!application.interviewDate) return true;

      const date = new Date(application.interviewDate);
      date.setHours(0, 0, 0, 0);

      return date >= today;
    })
    .sort((a, b) => {
      if (!a.interviewDate) return 1;
      if (!b.interviewDate) return -1;

      return (
        new Date(a.interviewDate) -
        new Date(b.interviewDate)
      );
    });

  const pastInterviews = interviewApplications
    .filter((application) => {
      if (!application.interviewDate) return false;

      const date = new Date(application.interviewDate);
      date.setHours(0, 0, 0, 0);

      return date < today;
    })
    .sort(
      (a, b) =>
        new Date(b.interviewDate) -
        new Date(a.interviewDate)
    );

  const displayedInterviews =
    activeTab === "upcoming"
      ? upcomingInterviews
      : pastInterviews;

  const formatDate = (date) => {
    if (!date) return "Date not set";

    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "Time not set";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getInterviewTypeIcon = (type) => {
    if (
      type === "Google Meet" ||
      type === "Zoom" ||
      type === "Microsoft Teams"
    ) {
      return <Video size={16} />;
    }

    if (type === "Office") {
      return <MapPin size={16} />;
    }

    return <Briefcase size={16} />;
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              Interview Manager
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Interviews
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Keep track of your upcoming and completed interviews.
            </p>
          </div>

          {/* TOTAL */}
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total Interviews
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {interviewApplications.length}
            </p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-6 flex w-fit rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-[#111827]">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
            activeTab === "upcoming"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Upcoming
          <span className="ml-2 opacity-70">
            {upcomingInterviews.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("past")}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
            activeTab === "past"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Past
          <span className="ml-2 opacity-70">
            {pastInterviews.length}
          </span>
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex items-center gap-3 text-slate-500">
            <Loader2 className="animate-spin" size={22} />
            Loading interviews...
          </div>
        </div>
      ) : displayedInterviews.length === 0 ? (
        /* EMPTY STATE */
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-[#111827]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10">
            <Calendar
              size={28}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
            {activeTab === "upcoming"
              ? "No upcoming interviews"
              : "No past interviews"}
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            {activeTab === "upcoming"
              ? "When you move an application to Interview status and add interview details, it will appear here."
              : "Completed interviews will appear here once their interview date has passed."}
          </p>
        </div>
      ) : (
        /* INTERVIEW CARDS */
        <div className="space-y-4">
          {displayedInterviews.map((application) => (
            <InterviewCard
              key={application._id}
              application={application}
              formatDate={formatDate}
              formatTime={formatTime}
              getInterviewTypeIcon={getInterviewTypeIcon}
              past={activeTab === "past"}
            />
          ))}
        </div>
      )}
    </main>
  );
}

/* ------------------------------------------------ */
/* INTERVIEW CARD */
/* ------------------------------------------------ */

function InterviewCard({
  application,
  formatDate,
  formatTime,
  getInterviewTypeIcon,
  past,
}) {
  return (
    <div
      className={`group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-[#111827] ${
        past
          ? "border-slate-200 dark:border-slate-800"
          : "border-blue-100 dark:border-slate-800"
      }`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {/* COMPANY */}
        <div className="flex min-w-0 flex-1 items-start gap-4">
          {/* LOGO */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
            {application.logo ? (
              <img
                src={application.logo}
                alt={application.company}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span className="text-xl font-bold text-slate-500">
                {application.company?.charAt(0)?.toUpperCase()}
              </span>
            )}
          </div>

          {/* COMPANY INFO */}
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-slate-900 dark:text-white">
              {application.company}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
              {application.role}
            </p>

            {application.location && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={13} />
                {application.location}
              </div>
            )}
          </div>
        </div>

        {/* DATE */}
        <div className="flex items-center gap-3 lg:w-48">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
            <Calendar
              size={18}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Interview Date
            </p>

            <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
              {formatDate(application.interviewDate)}
            </p>
          </div>
        </div>

        {/* TIME */}
        <div className="flex items-center gap-3 lg:w-32">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
            <Clock size={18} className="text-slate-500" />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Time
            </p>

            <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
              {formatTime(application.interviewTime)}
            </p>
          </div>
        </div>

        {/* TYPE */}
        <div className="lg:w-40">
          {application.interviewType ? (
            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {getInterviewTypeIcon(application.interviewType)}
              {application.interviewType}
            </div>
          ) : (
            <span className="text-sm text-slate-400">
              Type not set
            </span>
          )}
        </div>

        {/* ACTION */}
        <div className="flex items-center gap-2 lg:ml-auto">
          {!past &&
            application.interviewLink && (
              <a
                href={application.interviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <ExternalLink size={16} />
                Join
              </a>
            )}

          {application.interviewNotes && (
            <button
              onClick={() =>
                window.alert(
                  application.interviewNotes
                )
              }
              className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              title="View notes"
            >
              <FileText size={17} />
            </button>
          )}

          <ChevronRight
            size={18}
            className="hidden text-slate-400 transition group-hover:translate-x-1 lg:block"
          />
        </div>
      </div>
    </div>
  );
}