import { validationResult } from "express-validator";

// Runs after any validator rule chain. Collects all failed rules into
// one clean response instead of letting bad data reach the controller.
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: formatted,
    });
  }
  next();
};

export default validateRequest;