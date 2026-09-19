import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Send,
  Clock3,
  CalendarCheck,
  Trophy,
  XCircle,
  Plus,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import API from "../api";

import StatCard from "../components/Statcards";
import ApplicationsTable from "../components/ApplicationTable";
import ApplicationProgress from "../components/ApplicationProgress";
import ApplicationsChart from "../components/ApplicationsChart";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    screening: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [applicationsResponse, statsResponse] =
        await Promise.all([
          API.get("/applications"),
          API.get("/applications/stats"),
        ]);

      setApplications(applicationsResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error(
        "DASHBOARD ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // UPDATE
  // ------------------------------------------------

  const updateApplication = async (id, updatedData) => {
    try {
      const response = await API.put(
        `/applications/${id}`,
        updatedData
      );

      setApplications((prev) =>
        prev.map((application) =>
          (application._id || application.id) === id
            ? response.data
            : application
        )
      );

      // Refresh statistics after status change
      const statsResponse = await API.get(
        "/applications/stats"
      );

      setStats(statsResponse.data);
    } catch (error) {
      console.error(
        "UPDATE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application."
      );
    }
  };

  // ------------------------------------------------
  // DELETE
  // ------------------------------------------------

  const deleteApplication = async (id) => {
    try {
      await API.delete(`/applications/${id}`);

      setApplications((prev) =>
        prev.filter(
          (application) =>
            (application._id || application.id) !== id
        )
      );

      // Refresh statistics
      const statsResponse = await API.get(
        "/applications/stats"
      );

      setStats(statsResponse.data);
    } catch (error) {
      console.error(
        "DELETE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete application."
      );
    }
  };

  // ------------------------------------------------
  // RECENT APPLICATIONS
  // ------------------------------------------------

  const recentApplications = [...applications]
    .sort((a, b) => {
      return (
        new Date(b.date || b.createdAt) -
        new Date(a.date || a.createdAt)
      );
    })
    .slice(0, 5);

  // ------------------------------------------------
  // UPCOMING INTERVIEWS
  // ------------------------------------------------

  const upcomingInterviews = applications
    .filter(
      (application) =>
        application.status === "Interview" &&
        application.interviewDate
    )
    .filter((application) => {
      const interviewDate = new Date(
        application.interviewDate
      );

      return interviewDate >= new Date();
    })
    .sort(
      (a, b) =>
        new Date(a.interviewDate) -
        new Date(b.interviewDate)
    )
    .slice(0, 3);

  // ------------------------------------------------
  // LOADING
  // ------------------------------------------------

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2
            size={22}
            className="animate-spin"
          />
          Loading dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}

      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            Overview
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Here's what's happening with your job search.
          </p>
        </div>

        <Link
          to="/applications"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Application
        </Link>
      </div>

      {/* ============================================ */}
      {/* STAT CARDS */}
      {/* ============================================ */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <StatCard
          title="Total"
          value={stats.total}
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Applied"
          value={stats.applied}
          icon={Send}
        />

        <StatCard
          title="Screening"
          value={stats.screening}
          icon={Clock3}
        />

        <StatCard
          title="Interviews"
          value={stats.interviews}
          icon={CalendarCheck}
        />

        <StatCard
          title="Offers"
          value={stats.offers}
          icon={Trophy}
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={XCircle}
        />
      </div>

      {/* ============================================ */}
      {/* CHART + PROGRESS */}
      {/* ============================================ */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ApplicationsChart />

        <ApplicationProgress />
      </div>

      {/* ============================================ */}
      {/* RECENT APPLICATIONS */}
      {/* ============================================ */}

      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Applications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest job applications
            </p>
          </div>

          <Link
            to="/applications"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <ApplicationsTable
          applications={recentApplications}
          onUpdate={updateApplication}
          onDelete={deleteApplication}
        />
      </section>

      {/* ============================================ */}
      {/* UPCOMING INTERVIEWS */}
      {/* ============================================ */}

      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Upcoming Interviews
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Don't miss your upcoming interviews
            </p>
          </div>

          <Link
            to="/interviews"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {upcomingInterviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center dark:border-slate-700 dark:bg-[#111827]">
            <CalendarCheck
              size={28}
              className="mx-auto text-slate-400"
            />

            <p className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
              No upcoming interviews
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Interviews you schedule will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingInterviews.map((application) => (
              <InterviewPreview
                key={application._id}
                application={application}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ================================================= */
/* INTERVIEW PREVIEW */
/* ================================================= */

function InterviewPreview({ application }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        weekday: "short",
        day: "numeric",
        month: "short",
      }
    );
  };

  const formatTime = (time) => {
    if (!time) return "Time not set";

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes)
    );

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-[#111827]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
          {application.logo ? (
            <img
              src={application.logo}
              alt={application.company}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="font-bold text-slate-500">
              {application.company
                ?.charAt(0)
                ?.toUpperCase()}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-bold text-slate-900 dark:text-white">
            {application.company}
          </h3>

          <p className="mt-1 truncate text-sm text-slate-500">
            {application.role}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
          <p className="text-xs text-slate-500">
            Date
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
            {formatDate(application.interviewDate)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
          <p className="text-xs text-slate-500">
            Time
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
            {formatTime(application.interviewTime)}
          </p>
        </div>
      </div>

      {application.interviewLink && (
        <a
          href={application.interviewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Join Interview
        </a>
      )}
    </div>
  );
}