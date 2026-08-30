import { Router } from "express";
import { createLiveClass, getLiveClassesForItem, deleteLiveClass } from "../controllers/liveClassController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.use(protect, authorize("admin"));

router.post("/", createLiveClass);
router.get("/item/:itemType/:itemId", getLiveClassesForItem);
router.delete("/:id", deleteLiveClass);

export default router;