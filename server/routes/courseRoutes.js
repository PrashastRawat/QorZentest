import { Router } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  purchaseCourse,
} from "../controllers/courseController.js";
import { protect, authorize, optionalAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", getCourses);
router.get("/:id", optionalAuth, getCourseById);

router.post("/", protect, authorize("admin"), createCourse);
router.put("/:id", protect, authorize("admin"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

router.post("/:id/purchase", protect, purchaseCourse);

export default router;