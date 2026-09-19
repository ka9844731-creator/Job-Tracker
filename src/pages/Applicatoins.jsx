import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  BriefcaseBusiness,
} from "lucide-react";
import API from "../api";
import ApplicationsTable from "../components/ApplicationTable";
import AddApplication from "../components/AddApplication";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get("/applications");
      setApplications(response.data);
    } catch (error) {
      console.error(
        "FETCH APPLICATIONS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // ADD APPLICATION
  // ------------------------------------------------

  const addApplication = async (application) => {
    try {
      const response = await API.post("/applications", application);

      setApplications((prev) => [response.data, ...prev]);
      setShowAddModal(false);
    } catch (error) {
      console.error(
        "ADD APPLICATION ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add application."
      );
    }
  };

  // ------------------------------------------------
  // UPDATE APPLICATION
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
    } catch (error) {
      console.error(
        "UPDATE APPLICATION ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application."
      );
    }
  };

  // ------------------------------------------------
  // DELETE APPLICATION
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
    } catch (error) {
      console.error(
        "DELETE APPLICATION ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete application."
      );
    }
  };

  // ------------------------------------------------
  // FILTER + SEARCH + SORT
  // ------------------------------------------------

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // SEARCH
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((application) => {
        return (
          application.company
            ?.toLowerCase()
            .includes(query) ||
          application.role
            ?.toLowerCase()
            .includes(query) ||
          application.location
            ?.toLowerCase()
            .includes(query)
        );
      });
    }

    // STATUS FILTER
    if (statusFilter !== "All") {
      result = result.filter(
        (application) =>
          application.status === statusFilter
      );
    }

    // SORT
    result.sort((a, b) => {
      const dateA = new Date(
        a.date || a.createdAt
      ).getTime();

      const dateB = new Date(
        b.date || b.createdAt
      ).getTime();

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

    return result;
  }, [
    applications,
    search,
    statusFilter,
    sortOrder,
  ]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setSortOrder("newest");
  };

  const hasFilters =
    search.trim() !== "" ||
    statusFilter !== "All" ||
    sortOrder !== "newest";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ------------------------------------------- */}
      {/* HEADER */}
      {/* ------------------------------------------- */}

      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            <BriefcaseBusiness size={16} />
            Job Applications
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Applications
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Track and manage all your job applications in one place.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Application
        </button>
      </div>

      {/* ------------------------------------------- */}
      {/* FILTER BAR */}
      {/* ------------------------------------------- */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* SEARCH */}

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search company, role or location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-900"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* STATUS */}

          <div className="relative">
            <SlidersHorizontal
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-10 text-sm font-medium outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:w-48"
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Screening">
                Screening
              </option>
              <option value="Interview">
                Interview
              </option>
              <option value="Offer">Offer</option>
              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>

          {/* SORT */}

          <div className="relative">
            <ArrowUpDown
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-10 text-sm font-medium outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:w-48"
            >
              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>
            </select>
          </div>

          {/* CLEAR */}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------- */}
      {/* RESULT INFO */}
      {/* ------------------------------------------- */}

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {filteredApplications.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {applications.length}
          </span>{" "}
          applications
        </p>

        {statusFilter !== "All" && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            {statusFilter}
          </span>
        )}
      </div>

      {/* ------------------------------------------- */}
      {/* TABLE */}
      {/* ------------------------------------------- */}

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827]">
          <div className="text-sm text-slate-500">
            Loading applications...
          </div>
        </div>
      ) : (
        <ApplicationsTable
          applications={filteredApplications}
          onUpdate={updateApplication}
          onDelete={deleteApplication}
        />
      )}

      {/* ------------------------------------------- */}
      {/* ADD MODAL */}
      {/* ------------------------------------------- */}

      {showAddModal && (
        <AddApplication
          onClose={() => setShowAddModal(false)}
          onAdd={addApplication}
        />
      )}
    </main>
  );
}