import { useState } from "react";
import { X } from "lucide-react";

export default function AddApplication({ onClose, onAdd }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",

    interviewDate: "",
    interviewTime: "",
    interviewType: "",
    interviewLink: "",
    interviewNotes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.company || !form.role) {
      return;
    }

    const applicationData = {
      company: form.company,
      role: form.role,
      location: form.location,
      status: form.status,
      date: new Date(),

      logo: `https://www.google.com/s2/favicons?domain=${form.company
        .toLowerCase()
        .replaceAll(" ", "")}.com&sz=128`,
    };

    // Add interview details only when status is Interview
    if (form.status === "Interview") {
      applicationData.interviewDate =
        form.interviewDate || null;

      applicationData.interviewTime =
        form.interviewTime;

      applicationData.interviewType =
        form.interviewType;

      applicationData.interviewLink =
        form.interviewLink;

      applicationData.interviewNotes =
        form.interviewNotes;
    }

    onAdd(applicationData);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto overflow-hidden rounded-3xl bg-white shadow-2xl dark:border dark:border-slate-800 dark:bg-[#111827]">

        {/* ================= HEADER ================= */}

        <div className="flex items-start justify-between border-b border-slate-100 p-6 dark:border-slate-800">

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Add application
            </h2>

            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              Add a new opportunity to your pipeline.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={19} />
          </button>

        </div>


        {/* ================= FORM ================= */}

        <form
          onSubmit={submit}
          className="space-y-5 p-6"
        >

          {/* Company */}

          <Input
            label="Company"
            name="company"
            placeholder="e.g. Google"
            value={form.company}
            onChange={handleChange}
          />


          {/* Job title */}

          <Input
            label="Job title"
            name="role"
            placeholder="e.g. Frontend Intern"
            value={form.role}
            onChange={handleChange}
          />


          {/* Location */}

          <Input
            label="Location"
            name="location"
            placeholder="e.g. Bangalore / Remote"
            value={form.location}
            onChange={handleChange}
          />


          {/* Status */}

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option>Applied</option>
              <option>Screening</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>


          {/* ================= INTERVIEW DETAILS ================= */}

          {form.status === "Interview" && (
            <div className="space-y-5 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/5">

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Interview Details
                </h3>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Add information about your upcoming interview.
                </p>
              </div>


              {/* Interview Date */}

              <Input
                label="Interview date"
                name="interviewDate"
                type="date"
                value={form.interviewDate}
                onChange={handleChange}
              />


              {/* Interview Time */}

              <Input
                label="Interview time"
                name="interviewTime"
                type="time"
                value={form.interviewTime}
                onChange={handleChange}
              />


              {/* Interview Type */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Interview type
                </label>

                <select
                  name="interviewType"
                  value={form.interviewType}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  <option value="">
                    Select interview type
                  </option>

                  <option value="Google Meet">
                    Google Meet
                  </option>

                  <option value="Zoom">
                    Zoom
                  </option>

                  <option value="Microsoft Teams">
                    Microsoft Teams
                  </option>

                  <option value="Phone">
                    Phone
                  </option>

                  <option value="Office">
                    Office
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>


              {/* Interview Link */}

              <Input
                label="Meeting link"
                name="interviewLink"
                placeholder="https://meet.google.com/..."
                value={form.interviewLink}
                onChange={handleChange}
              />


              {/* Interview Notes */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Interview notes
                </label>

                <textarea
                  name="interviewNotes"
                  value={form.interviewNotes}
                  onChange={handleChange}
                  placeholder="e.g. Prepare React, JavaScript and DSA questions"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600"
                />
              </div>

            </div>
          )}


          {/* ================= BUTTONS ================= */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Add application
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


/* ================= INPUT COMPONENT ================= */

function Input({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600 dark:focus:bg-slate-900"
      />

    </div>
  );
}