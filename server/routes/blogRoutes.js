import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect, authorize } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { validateCreateBlog } from "../validators/blogValidators.js";
import validateRequest from "../middleware/validateRequest.js";

const router = Router();

router.get("/", getBlogs);
router.get("/:identifier", getBlogBySlug);

router.post("/", protect, authorize("admin"), upload.array("images", 10), validateCreateBlog, validateRequest, createBlog);
router.put("/:id", protect, authorize("admin"), updateBlog);
router.delete("/:id", protect, authorize("admin"), deleteBlog);

export default router;