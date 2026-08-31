import { Router } from "express";
import {
  createLiveClass,
  getLiveClassesForItem,
  deleteLiveClass,
  getLiveClassRoster,
  markAttendance,
} from "../controllers/liveClassController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.use(protect, authorize("admin"));

router.post("/", createLiveClass);
router.get("/item/:itemType/:itemId", getLiveClassesForItem);
router.get("/:id/roster", getLiveClassRoster);
router.put("/:id/attendance", markAttendance);
router.delete("/:id", deleteLiveClass);

export default router;