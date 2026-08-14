import { Router } from "express";
import {
  createCareer,
  getCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
} from "../controllers/careerController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", getCareers);
router.get("/:id", getCareerById);

router.post("/", protect, authorize("admin"), createCareer);
router.put("/:id", protect, authorize("admin"), updateCareer);
router.delete("/:id", protect, authorize("admin"), deleteCareer);

export default router;