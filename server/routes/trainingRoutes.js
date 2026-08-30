import { Router } from "express";
import {
  getTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
} from "../controllers/trainingController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", getTrainings);
router.get("/:id", getTrainingById);

router.post("/", protect, authorize("admin"), createTraining);
router.put("/:id", protect, authorize("admin"), updateTraining);
router.delete("/:id", protect, authorize("admin"), deleteTraining);

export default router;