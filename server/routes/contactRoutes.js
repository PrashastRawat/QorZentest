import { Router } from "express";
import {
  createContact,
  getSubmissions,
  deleteSubmission,
} from "../controllers/contactController.js";
import { protect, authorize } from "../middleware/auth.js";
import { validateCreateContact } from "../validators/contactValidators.js";
import validateRequest from "../middleware/validateRequest.js";

const router = Router();

router.post("/", validateCreateContact, validateRequest, createContact);

router.get("/", protect, authorize("admin"), getSubmissions);
router.delete("/:id", protect, authorize("admin"), deleteSubmission);

export default router;