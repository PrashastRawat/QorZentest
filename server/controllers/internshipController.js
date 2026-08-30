import Internship from "../models/Internship.js";
import InternshipApplication from "../models/InternshipApplication.js";
import Student from "../models/Student.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// @desc   Create an internship listing (admin only)
export const createInternship = async (req, res, next) => {
  try {
    const internship = await Internship.create(req.body);
    res.status(201).json({ success: true, data: internship });
  } catch (error) {
    next(error);
  }
};

// @desc   Get all active internships (public)
export const getInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: internships.length, data: internships });
  } catch (error) {
    next(error);
  }
};

// @desc   Get single internship (public)
export const getInternshipById = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      const error = new Error("Internship not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: internship });
  } catch (error) {
    next(error);
  }
};

// @desc   Update internship (admin only)
export const updateInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!internship) {
      const error = new Error("Internship not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: internship });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete internship (admin only)
export const deleteInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      const error = new Error("Internship not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, message: "Internship deleted" });
  } catch (error) {
    next(error);
  }
};

// @desc   Apply to an internship with a CV (public, or linked to student if logged in)
export const applyToInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      const error = new Error("Internship not found");
      error.statusCode = 404;
      throw error;
    }

    if (!req.file) {
      const error = new Error("A CV file is required to apply");
      error.statusCode = 400;
      throw error;
    }

    const { name, email, phone, selectedDuration } = req.body;
    if (!name || !email || !phone || !selectedDuration) {
      const error = new Error("Name, email, phone, and selected duration are required");
      error.statusCode = 400;
      throw error;
    }

    // Map the chosen duration to the correct price field on the internship itself,
    // rather than trusting a price sent from the frontend — admin controls pricing
    // via the Internship model, so that's the only source of truth.
    const priceByDuration = {
      "1 Month": internship.price1Month,
      "3 Months": internship.price3Month,
      "6 Months": internship.price6Month,
    };
    const selectedPrice = priceByDuration[selectedDuration];

    if (selectedPrice === undefined) {
      const error = new Error("Invalid selected duration");
      error.statusCode = 400;
      throw error;
    }

    let studentId = null;
    if (req.user) {
      const student = await Student.findOne({ userId: req.user._id });
      if (student) studentId = student._id;
    }

    const { url, publicId } = await uploadToCloudinary(req.file.buffer, "qorzen/cvs");

    const application = await InternshipApplication.create({
      internshipId: internship._id,
      studentId,
      name,
      email,
      phone,
      selectedDuration,
      selectedPrice,
      cvUrl: url,
      cvPublicId: publicId,
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

// @desc   Get all applications for an internship (admin only)
export const getInternshipApplications = async (req, res, next) => {
  try {
    const applications = await InternshipApplication.find({ internshipId: req.params.id })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    next(error);
  }
};