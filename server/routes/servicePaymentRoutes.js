import { Router } from "express";
import {
  createServicePayment,
  getServicePayments,
  getServicePaymentById,
  updateServicePayment,
  deleteServicePayment,
  getServiceRevenueSummary,
} from "../controllers/servicePaymentController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

// All service-payment routes are admin-only — this is internal
// revenue/CRM data, never exposed publicly.
router.get("/", protect, authorize("admin"), getServicePayments);
router.get("/stats/revenue", protect, authorize("admin"), getServiceRevenueSummary);
router.get("/:id", protect, authorize("admin"), getServicePaymentById);
router.post("/", protect, authorize("admin"), createServicePayment);
router.put("/:id", protect, authorize("admin"), updateServicePayment);
router.delete("/:id", protect, authorize("admin"), deleteServicePayment);

export default router;