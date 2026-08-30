import { body } from "express-validator";

export const validateCreateCourse = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price").notEmpty().withMessage("Price is required")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("instructor").trim().notEmpty().withMessage("Instructor name is required"),
  body("category").optional().trim(),
  body("duration").optional().trim(),
];