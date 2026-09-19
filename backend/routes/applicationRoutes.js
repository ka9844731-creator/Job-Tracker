import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getStats,
} from "../controllers/applicationController.js";

const router = express.Router();

router.use(protect);

router.get("/", getApplications);

router.post("/", createApplication);

router.get("/stats", getStats);

router.put("/:id", updateApplication);

router.delete("/:id", deleteApplication);

export default router;