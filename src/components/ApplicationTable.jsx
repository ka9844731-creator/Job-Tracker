import { useState } from "react";
import {
  Pencil,
  Trash2,
  X,
  Calendar,
  Clock,
  Video,
  Link as LinkIcon,
  FileText,
} from "lucide-react";

export default function ApplicationsTable({
  applications = [],
  onUpdate,
  onDelete,
}) {
  const [editingApplication, setEditingApplication] = useState(null);
  const [editForm, setEditForm] = useState({});

  const openEdit = (application) => {
    setEditingApplication(application);

    setEditForm({
      company: application.company || "",
      role: application.role || "",
      location: application.location || "",
      status: application.status || "Applied",
      date: application.date
        ? new Date(application.date).toISOString().split("T")[0]
        : "",
      interviewDate: application.interviewDate
        ? new Date(application.interviewDate)
            .toISOString()
            .split("T")[0]
        : "",
      interviewTime: application.interviewTime || "",
      interviewType: application.interviewType || "",
      interviewLink: application.interviewLink || "",
      interviewNotes: application.interviewNotes || "",
    });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editForm.company || !editForm.role) {
      return;
    }

    const updated = {
      ...editForm,

      // Interview details should only exist for Interview status
      interviewDate:
        editForm.status === "Interview"
          ? editForm.interviewDate || null
          : null,

      interviewTime:
        editForm.status === "Interview"
          ? editForm.interviewTime || ""
          : "",

      interviewType:
        editForm.status === "Interview"
          ? editForm.interviewType || ""
          : "",

      interviewLink:
        editForm.status === "Interview"
          ? editForm.interviewLink || ""
          : "",

      interviewNotes:
        editForm.status === "Interview"
          ? editForm.interviewNotes || ""
          : "",
    };

    await onUpdate(
      editingApplication._id || editingApplication.id,
      updated
    );

    setEditingApplication(null);
  };

  const handleDelete = async (application) => {
    const id = application._id || application.id;

    const confirmed = window.confirm(
      `Are you sure you want to delete the application for ${application.company}?`
    );

    if (!confirmed) return;

    await onDelete(id);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";

      case "Screening":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400";

      case "Interview":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";

      case "Offer":
        return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";

      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Company
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Location
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Date
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr
                  key={application._id || application.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50"
                >
                  {/* COMPANY */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
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
                          <span className="font-bold text-slate-500">
                            {application.company?.charAt(0)}
                          </span>
                        )}
                      </div>

                      <span className="font-semibold text-slate-900 dark:text-white">
                        {application.company}
                      </span>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                    {application.role}
                  </td>

                  {/* LOCATION */}
                  <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                    {application.location || "-"}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                    {formatDate(application.date)}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(application)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                        title="Edit application"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(application)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                        title="Delete application"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-[#111827]">
            {/* HEADER */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 dark:border-slate-800 dark:bg-[#111827]">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Edit Application
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your application details
                </p>
              </div>

              <button
                onClick={() => setEditingApplication(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleUpdate} className="space-y-6 p-6">
              {/* BASIC DETAILS */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Application Details
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* COMPANY */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Company
                    </label>

                    <input
                      type="text"
                      name="company"
                      value={editForm.company}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  {/* ROLE */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Role
                    </label>

                    <input
                      type="text"
                      name="role"
                      value={editForm.role}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  {/* LOCATION */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleChange}
                      placeholder="Remote / Bangalore"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  {/* STATUS */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Status
                    </label>

                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  {/* APPLICATION DATE */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Application Date
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* INTERVIEW DETAILS */}
              {editForm.status === "Interview" && (
                <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-5 dark:border-purple-500/20 dark:bg-purple-500/5">
                  <div className="mb-4">
                    <h3 className="flex items-center gap-2 font-semibold text-purple-700 dark:text-purple-400">
                      <Calendar size={18} />
                      Interview Details
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Add information about your upcoming interview.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* INTERVIEW DATE */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <Calendar size={15} />
                        Interview Date
                      </label>

                      <input
                        type="date"
                        name="interviewDate"
                        value={editForm.interviewDate}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>

                    {/* INTERVIEW TIME */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <Clock size={15} />
                        Interview Time
                      </label>

                      <input
                        type="time"
                        name="interviewTime"
                        value={editForm.interviewTime}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>

                    {/* INTERVIEW TYPE */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <Video size={15} />
                        Interview Type
                      </label>

                      <select
                        name="interviewType"
                        value={editForm.interviewType}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      >
                        <option value="">Select type</option>
                        <option value="Google Meet">Google Meet</option>
                        <option value="Zoom">Zoom</option>
                        <option value="Microsoft Teams">
                          Microsoft Teams
                        </option>
                        <option value="Phone">Phone</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* MEETING LINK */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <LinkIcon size={15} />
                        Meeting Link
                      </label>

                      <input
                        type="url"
                        name="interviewLink"
                        value={editForm.interviewLink}
                        onChange={handleChange}
                        placeholder="https://meet.google.com/..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>

                    {/* NOTES */}
                    <div className="sm:col-span-2">
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <FileText size={15} />
                        Interview Notes
                      </label>

                      <textarea
                        name="interviewNotes"
                        value={editForm.interviewNotes}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Add preparation notes, interviewer details, topics to revise..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingApplication(null)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}