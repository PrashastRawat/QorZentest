import { Router } from "express";
import {
  createAssignment,
  getAssignmentsForCourse,
  updateAssignment,
  deleteAssignment,
  getSubmissionsForAssignment,
  gradeSubmission,
} from "../controllers/assignmentController.js";
import { protect, authorize } from "../middleware/auth.js";
import uploadDocument from "../middleware/uploadDocument.js";

const router = Router();

// Everything here is admin-only.
router.use(protect, authorize("admin"));

router.get("/course/:courseId", getAssignmentsForCourse);
router.post("/course/:courseId", uploadDocument.single("brief"), createAssignment);
router.put("/:id", uploadDocument.single("brief"), updateAssignment);
router.delete("/:id", deleteAssignment);
router.get("/:id/submissions", getSubmissionsForAssignment);
router.put("/submissions/:submissionId/grade", gradeSubmission);

export default router;