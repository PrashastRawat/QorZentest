import { Router } from "express";
import {
  createInternship,
  getInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  applyToInternship,
  getInternshipApplications,
  updateApplicationStatus,
} from "../controllers/internshipController.js";
import { protect, authorize, optionalAuth } from "../middleware/auth.js";
import { uploadResume } from "../middleware/uploadDocument.js";

const router = Router();

// NOTE: this must come before "/:id" — otherwise Express matches
// "/applications" against the ":id" param route and this never gets hit.
router.put("/applications/:appId/status", protect, authorize("admin"), updateApplicationStatus);

router.get("/", getInternships);
router.get("/:id", getInternshipById);
router.post("/", protect, authorize("admin"), createInternship);
router.put("/:id", protect, authorize("admin"), updateInternship);
router.delete("/:id", protect, authorize("admin"), deleteInternship);

router.post("/:id/apply", optionalAuth, uploadResume.single("cv"), applyToInternship);
router.get("/:id/applications", protect, authorize("admin"), getInternshipApplications);

export default router;