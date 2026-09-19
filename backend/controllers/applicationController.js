import Application from "../models/Application.js";

// GET ALL APPLICATIONS
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user,
    }).sort({
      createdAt: -1,
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications.",
      error: error.message,
    });
  }
};

// CREATE APPLICATION
export const createApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      status,
      date,
      logo,

      interviewDate,
      interviewTime,
      interviewType,
      interviewLink,
      interviewNotes,
    } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        message: "Company and role are required.",
      });
    }

    const application = await Application.create({
      user: req.user,

      company,
      role,
      location,
      status,
      date: date || new Date(),
      logo,

      interviewDate:
        status === "Interview"
          ? interviewDate || null
          : null,

      interviewTime:
        status === "Interview"
          ? interviewTime || ""
          : "",

      interviewType:
        status === "Interview"
          ? interviewType || ""
          : "",

      interviewLink:
        status === "Interview"
          ? interviewLink || ""
          : "",

      interviewNotes:
        status === "Interview"
          ? interviewNotes || ""
          : "",
    });

    res.status(201).json(application);

  } catch (error) {
    res.status(500).json({
      message: "Failed to create application.",
      error: error.message,
    });
  }
};

// UPDATE APPLICATION
export const updateApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      status,
      date,
      logo,
      interviewDate,
      interviewTime,
      interviewType,
      interviewLink,
      interviewNotes,
    } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        message: "Company and role are required.",
      });
    }

    const application = await Application.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user,
      },
      {
        company,
        role,
        location,
        status,
        date,
        logo,

        interviewDate:
          status === "Interview" ? interviewDate || null : null,

        interviewTime:
          status === "Interview" ? interviewTime || "" : "",

        interviewType:
          status === "Interview" ? interviewType || "" : "",

        interviewLink:
          status === "Interview" ? interviewLink || "" : "",

        interviewNotes:
          status === "Interview" ? interviewNotes || "" : "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update application.",
      error: error.message,
    });
  }
};

// DELETE APPLICATION
export const deleteApplication = async (req, res) => {
  try {
    const application =
      await Application.findOneAndDelete({
        _id: req.params.id,
        user: req.user,
      });

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    res.json({
      message: "Application deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete application.",
      error: error.message,
    });
  }
};

// GET STATISTICS
export const getStats = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user,
    });

    const total = applications.length;

    const applied = applications.filter(
      (app) => app.status === "Applied"
    ).length;

    const screening = applications.filter(
      (app) => app.status === "Screening"
    ).length;

    const interviews = applications.filter(
      (app) => app.status === "Interview"
    ).length;

    const offers = applications.filter(
      (app) => app.status === "Offer"
    ).length;

    const rejected = applications.filter(
      (app) => app.status === "Rejected"
    ).length;

    const responseCount =
      screening + interviews + offers;

    const responseRate =
      total > 0
        ? Math.round((responseCount / total) * 100)
        : 0;

    const interviewRate =
      total > 0
        ? Math.round((interviews / total) * 100)
        : 0;

    const offerRate =
      total > 0
        ? Math.round((offers / total) * 100)
        : 0;

    res.json({
      total,
      applied,
      screening,
      interviews,
      offers,
      rejected,
      responseRate,
      interviewRate,
      offerRate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch statistics.",
      error: error.message,
    });
  }
};