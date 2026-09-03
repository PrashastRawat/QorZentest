import { Router } from "express";
import { getSubmissions, deleteSubmission } from "../controllers/submissionController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

// Admin-only — these are leads (names/emails/phone numbers), not public data.
router.get("/", protect, authorize("admin"), getSubmissions);
router.delete("/:id", protect, authorize("admin"), deleteSubmission);

export default router;