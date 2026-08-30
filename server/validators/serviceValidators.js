import { body } from "express-validator";

export const validateCreateService = [
  body("title").trim().notEmpty().withMessage("Title is required")
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("priceStartingFrom").optional()
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("categoryLabel").optional().isString()
    .isLength({ max: 150 }).withMessage("Category label cannot exceed 150 characters"),
  body("tagline").optional().isString()
    .isLength({ max: 300 }).withMessage("Tagline cannot exceed 300 characters"),
  body("slug").optional().isString().trim().toLowerCase(),
];