import { body } from "express-validator";

export const validateCreateService = [
  body("title").trim().notEmpty().withMessage("Title is required")
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("priceStartingFrom").notEmpty().withMessage("Starting price is required")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),
];