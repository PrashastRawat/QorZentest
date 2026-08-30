import { Router } from "express";
import {
  createInternship,
  getInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  applyToInternship,
  getInternshipApplications,
} from "../controllers/internshipController.js";
import { protect, authorize, optionalAuth } from "../middleware/auth.js";
import uploadDocument from "../middleware/uploadDocument.js";

const router = Router();

router.get("/", getInternships);
router.get("/:id", getInternshipById);
router.post("/", protect, authorize("admin"), createInternship);
router.put("/:id", protect, authorize("admin"), updateInternship);
router.delete("/:id", protect, authorize("admin"), deleteInternship);

router.post("/:id/apply", optionalAuth, uploadDocument.single("cv"), applyToInternship);
router.get("/:id/applications", protect, authorize("admin"), getInternshipApplications);

export default router;