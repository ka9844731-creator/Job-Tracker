import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // ================= USER =================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ================= COMPANY =================

    company: {
      type: String,
      required: true,
      trim: true,
    },

    // ================= ROLE =================

    role: {
      type: String,
      required: true,
      trim: true,
    },

    // ================= LOCATION =================

    location: {
      type: String,
      default: "",
      trim: true,
    },

    // ================= STATUS =================

    status: {
      type: String,
      enum: [
        "Applied",
        "Screening",
        "Interview",
        "Offer",
        "Rejected",
      ],
      default: "Applied",
    },

    // ================= APPLICATION DATE =================

    date: {
      type: Date,
      default: Date.now,
    },

    // ================= COMPANY LOGO =================

    logo: {
      type: String,
      default: "",
    },

    // ================= INTERVIEW DETAILS =================

    interviewDate: {
      type: Date,
      default: null,
    },

    interviewTime: {
      type: String,
      default: "",
      trim: true,
    },

    interviewType: {
      type: String,
      enum: [
        "",
        "Google Meet",
        "Zoom",
        "Microsoft Teams",
        "Phone",
        "Office",
        "Other",
      ],
      default: "",
    },

    interviewLink: {
      type: String,
      default: "",
      trim: true,
    },

    interviewNotes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;