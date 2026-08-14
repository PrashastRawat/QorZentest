import Career from "../models/Career.js";

// @desc   Create a job listing (admin only)
// @route  POST /api/careers
export const createCareer = async (req, res, next) => {
  try {
    const { title, department, location, type, description, requirements } = req.body;

    const career = await Career.create({
      title,
      department,
      location,
      type,
      description,
      requirements,
    });

    res.status(201).json({
      success: true,
      message: "Job listing created successfully",
      data: career,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get all active job listings (public)
// @route  GET /api/careers
export const getCareers = async (req, res, next) => {
  try {
    const careers = await Career.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: careers.length,
      data: careers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get single job listing by ID (public)
// @route  GET /api/careers/:id
export const getCareerById = async (req, res, next) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      const error = new Error("Job listing not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: career,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Update a job listing (admin only)
// @route  PUT /api/careers/:id
export const updateCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!career) {
      const error = new Error("Job listing not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Job listing updated successfully",
      data: career,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete a job listing (admin only)
// @route  DELETE /api/careers/:id
export const deleteCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);

    if (!career) {
      const error = new Error("Job listing not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Job listing deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};