import Internship from "../models/Internship.js";
import InternshipApplication from "../models/InternshipApplication.js";
import Student from "../models/Student.js";
import EnrollmentRequest from "../models/EnrollmentRequest.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { grantEnrollmentAccess, generateRequestCode } from "./enrollmentRequestController.js";

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

// @desc   Admin moves an application through pending -> contacted -> enrolled
//         (or rejected). Mirrors confirmEnrollmentRequest's role for
//         Course/Training: this is the one place that actually grants a
//         student real internship access, so it's also the one place that
//         syncs Student.enrolledInternships.
// @route  PUT /api/internships/applications/:appId/status
// @desc   Admin moves an application through pending -> contacted -> enrolled
//         (or rejected).
//
//         When moved to "enrolled", this now ALWAYS goes through the same
//         EnrollmentRequest pipeline as the paid (WhatsApp/Razorpay) flow —
//         either reusing an existing request for this application, or
//         creating + auto-confirming one (method: "whatsapp", meaning
//         "handled outside the app" — e.g. cash/bank transfer/manual
//         confirmation). This guarantees every enrolled internship has
//         exactly one confirmed EnrollmentRequest, so it always shows up in
//         the admin "Enrollment Requests" tab and is counted exactly once
//         in revenue. grantEnrollmentAccess() is then reused to sync
//         Student.enrolledInternships, instead of duplicating that logic here.
// @route  PUT /api/internships/applications/:appId/status
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["pending", "contacted", "enrolled", "rejected"].includes(status)) {
      const error = new Error("status must be one of: pending, contacted, enrolled, rejected");
      error.statusCode = 400;
      throw error;
    }

    const application = await InternshipApplication.findById(req.params.appId);
    if (!application) {
      const error = new Error("Application not found");
      error.statusCode = 404;
      throw error;
    }

    application.status = status;
    await application.save();

    let syncedToStudent = false;

    if (status === "enrolled") {
      if (!application.studentId) {
        // Guest applicant — no account to attach a paid enrollment to yet.
        res.status(200).json({
          success: true,
          message:
            "Status updated to enrolled, but this application has no linked student account — nothing was added to any student record and no revenue was recorded. Ask the student to log in and re-submit, or link their account first.",
          data: application,
          syncedToStudent: false,
        });
        return;
      }

      const studentDoc = await Student.findById(application.studentId);
      if (!studentDoc) {
        const error = new Error("Linked student profile not found");
        error.statusCode = 404;
        throw error;
      }

      const internship = await Internship.findById(application.internshipId);
      if (!internship) {
        const error = new Error("Internship not found");
        error.statusCode = 404;
        throw error;
      }

      // Reuse an existing request for this application if one already
      // exists (e.g. the student did submit a WhatsApp/Razorpay request
      // and the admin is confirming it from this modal instead of the
      // Enrollment Requests tab) — never create a duplicate.
      let request = await EnrollmentRequest.findOne({ applicationId: application._id });

      if (!request) {
        const requestCode = await generateRequestCode();
        request = await EnrollmentRequest.create({
          student: studentDoc.userId,
          itemType: "internship",
          itemId: internship._id,
          itemTitle: internship.title,
          amount: application.selectedPrice,
          method: "whatsapp",
          requestCode,
          applicationId: application._id,
          status: "confirmed",
          confirmedBy: req.user._id,
          confirmedAt: new Date(),
        });
      } else if (request.status !== "confirmed") {
        request.status = "confirmed";
        request.confirmedBy = req.user._id;
        request.confirmedAt = new Date();
        await request.save();
      }

      await grantEnrollmentAccess(request);
      syncedToStudent = true;
    }

    res.status(200).json({
      success: true,
      message: "Application status updated",
      data: application,
      syncedToStudent,
    });
  } catch (error) {
    next(error);
  }
};