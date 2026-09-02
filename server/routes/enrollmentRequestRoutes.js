import { Router } from "express";
import {
  createEnrollmentRequest,
  getEnrollmentRequests,
  getMyEnrollmentRequests,
  confirmEnrollmentRequest,
  rejectEnrollmentRequest,
  deleteEnrollmentRequest,
  getRevenueSummary,
} from "../controllers/enrollmentRequestController.js";
import { protect, authorize } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = Router();

router.post("/", protect, createEnrollmentRequest);
router.get("/", protect, authorize("admin"), getEnrollmentRequests);
router.get("/my", protect, getMyEnrollmentRequests);
router.put("/:id/confirm", protect, authorize("admin"), upload.single("paymentProof"), confirmEnrollmentRequest);
router.put("/:id/reject", protect, authorize("admin"), rejectEnrollmentRequest);
router.delete("/:id", protect, authorize("admin"), deleteEnrollmentRequest);
router.get("/stats/revenue", protect, authorize("admin"), getRevenueSummary);

export default router;
