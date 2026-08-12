import { body } from "express-validator";

export const validateCreateBlog = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required")
    .isLength({ min: 20 }).withMessage("Content should be at least 20 characters"),
  body("category").trim().notEmpty().withMessage("Category is required"),
];