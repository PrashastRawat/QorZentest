import { Router } from "express";
import {
  createContact,
  getSubmissions,
  deleteSubmission,
} from "../controllers/contactController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.post("/", createContact); // public — anyone can submit

router.get("/", protect, authorize("admin"), getSubmissions);
router.delete("/:id", protect, authorize("admin"), deleteSubmission);

export default router;