import { body } from "express-validator";

export const validateCreateTestimonial = [
  body("clientName").trim().notEmpty().withMessage("Client name is required"),
  body("message").trim().notEmpty().withMessage("Message is required")
    .isLength({ max: 500 }).withMessage("Message cannot exceed 500 characters"),
];