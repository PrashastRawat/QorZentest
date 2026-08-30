import { Router } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  createOrder,
  verifyPayment,
  getMyCourses,
} from "../controllers/courseController.js";
import { protect, authorize, optionalAuth } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { validateCreateCourse } from "../validators/courseValidators.js";
import validateRequest from "../middleware/validateRequest.js";

const router = Router();

router.get("/", getCourses);
router.get("/my/purchased", protect, getMyCourses);
router.get("/:id", optionalAuth, getCourseById);

router.post("/", protect, authorize("admin"), upload.single("thumbnail"), validateCreateCourse, validateRequest, createCourse);
router.put("/:id", protect, authorize("admin"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

router.post("/:id/create-order", protect, createOrder);
router.post("/:id/verify-payment", protect, verifyPayment);
export default router;