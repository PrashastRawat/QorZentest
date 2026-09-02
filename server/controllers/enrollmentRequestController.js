import EnrollmentRequest from "../models/EnrollmentRequest.js";
import Course from "../models/Course.js";
import Training from "../models/Training.js";
import Internship from "../models/Internship.js";
import InternshipApplication from "../models/InternshipApplication.js";
import User from "../models/User.js";
import Student from "../models/Student.js"; 
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// Generates a short, human-shareable code like "QZ-482913", retrying
// on the rare chance of a collision with an existing request.
const generateRequestCode = async () => {
  let code;
  let exists = true;
  while (exists) {
    const random = Math.floor(100000 + Math.random() * 900000);
    code = `QZ-${random}`;
    exists = await EnrollmentRequest.findOne({ requestCode: code });
  }
  return code;
};

// Shared by confirmEnrollmentRequest (admin, WhatsApp path) and
// paymentController.verifyPayment (auto-confirm, Razorpay path) —
// keeping this in one place means both paths always stay in sync.
export const grantEnrollmentAccess = async (request) => {
  // Internship has its own record shape (an InternshipApplication, synced into
  // Student.enrolledInternships) — it doesn't use User.purchasedCourses/Trainings
  // at all, so it's handled entirely separately and returns early.
  if (request.itemType === "internship") {
    if (!request.applicationId) return;
    const application = await InternshipApplication.findById(request.applicationId);
    if (!application) return;

    application.status = "enrolled";
    await application.save();

    const studentDoc = await Student.findOneAndUpdate(
      { userId: request.student },
      { $setOnInsert: { userId: request.student } },
      { upsert: true, new: true }
    );
    const alreadyEnrolled = studentDoc.enrolledInternships.some(
      (e) => e.applicationId && e.applicationId.toString() === application._id.toString()
    );
    if (!alreadyEnrolled) {
      studentDoc.enrolledInternships.push({
        internshipId: request.itemId,
        applicationId: application._id,
        selectedDuration: application.selectedDuration,
        enrolledAt: new Date(),
        progress: 0,
      });
      await studentDoc.save();
    }
    return;
  }

  const student = await User.findById(request.student);
  const field = request.itemType === "course" ? "purchasedCourses" : "purchasedTrainings";
  const alreadyOwned = student[field].some((id) => id.toString() === request.itemId.toString());
  if (!alreadyOwned) {
    student[field].push(request.itemId);
    await student.save();
  }

  if (request.itemType === "course") {
    const studentDoc = await Student.findOneAndUpdate(
      { userId: request.student },
      { $setOnInsert: { userId: request.student } },
      { upsert: true, new: true }
    );
    const alreadyEnrolled = studentDoc.enrolledCourses.some(
      (e) => e.courseId.toString() === request.itemId.toString()
    );
    if (!alreadyEnrolled) {
      studentDoc.enrolledCourses.push({
        courseId: request.itemId,
        enrolledAt: new Date(),
        progress: 0,
      });
      await studentDoc.save();
    }
  }

  if (request.itemType === "training") {
    const studentDoc = await Student.findOneAndUpdate(
      { userId: request.student },
      { $setOnInsert: { userId: request.student } },
      { upsert: true, new: true }
    );
    const alreadyEnrolled = studentDoc.enrolledTrainings.some(
      (e) => e.trainingId.toString() === request.itemId.toString()
    );
    if (!alreadyEnrolled) {
      studentDoc.enrolledTrainings.push({
        trainingId: request.itemId,
        enrolledAt: new Date(),
        progress: 0,
      });
      await studentDoc.save();
    }
  }
};

// @desc   Student creates a new enrollment request (Course or Training)
// @route  POST /api/enrollment-requests
export const createEnrollmentRequest = async (req, res, next) => {
  try {
    const { itemType, itemId, method, batchTiming, applicationId, contactChannel } = req.body;

    if (!["course", "training", "internship"].includes(itemType)) {
      const error = new Error("itemType must be 'course', 'training', or 'internship'");
      error.statusCode = 400;
      throw error;
    }
    if (!["whatsapp", "razorpay"].includes(method)) {
      const error = new Error("method must be 'whatsapp' or 'razorpay'");
      error.statusCode = 400;
      throw error;
    }

    let enrollmentRequest;

    if (itemType === "internship") {
      if (!applicationId) {
        const error = new Error("applicationId is required for internship enrollment requests");
        error.statusCode = 400;
        throw error;
      }
      const application = await InternshipApplication.findById(applicationId);
      if (!application) {
        const error = new Error("Internship application not found");
        error.statusCode = 404;
        throw error;
      }
      const internship = await Internship.findById(application.internshipId);
      if (!internship) {
        const error = new Error("Internship not found");
        error.statusCode = 404;
        throw error;
      }

      // Late-link a guest application to the now-logged-in student's account,
      // so grantEnrollmentAccess can sync it into Student.enrolledInternships.
      if (!application.studentId) {
        const studentDoc = await Student.findOneAndUpdate(
          { userId: req.user._id },
          { $setOnInsert: { userId: req.user._id } },
          { upsert: true, new: true }
        );
        application.studentId = studentDoc._id;
        await application.save();
      }

      const requestCode = await generateRequestCode();
      enrollmentRequest = await EnrollmentRequest.create({
        student: req.user._id,
        itemType,
        itemId: internship._id,
        itemTitle: internship.title,
        amount: application.selectedPrice,
        method,
        requestCode,
        applicationId: application._id,
        contactChannel,
      });
    } else {
      // Look up the real item so we snapshot its current title/price —
      // never trust title/price if sent from the frontend directly.
      const Model = itemType === "course" ? Course : Training;
      const item = await Model.findById(itemId);
      if (!item) {
        const error = new Error(`${itemType} not found`);
        error.statusCode = 404;
        throw error;
      }

      const requestCode = await generateRequestCode();
      enrollmentRequest = await EnrollmentRequest.create({
        student: req.user._id,
        itemType,
        itemId: item._id,
        itemTitle: item.title,
        amount: item.price ?? item.priceStartingFrom ?? 0,
        method,
        requestCode,
        batchTiming,
      });
    }

    res.status(201).json({
      success: true,
      message: "Enrollment request created successfully",
      data: enrollmentRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get all enrollment requests (admin only), optionally filtered by status
// @route  GET /api/enrollment-requests?status=pending
export const getEnrollmentRequests = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const requests = await EnrollmentRequest.find(filter)
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get the logged-in student's own enrollment requests
// @route  GET /api/enrollment-requests/my
export const getMyEnrollmentRequests = async (req, res, next) => {
  try {
    const requests = await EnrollmentRequest.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin confirms payment for a request — grants access + optional proof upload
// @route  PUT /api/enrollment-requests/:id/confirm
export const confirmEnrollmentRequest = async (req, res, next) => {
  try {
    const request = await EnrollmentRequest.findById(req.params.id);
    if (!request) {
      const error = new Error("Enrollment request not found");
      error.statusCode = 404;
      throw error;
    }

    if (req.file) {
      request.paymentProof = await uploadToCloudinary(req.file.buffer, "qorzen/payment-proofs");
    }

    request.status = "confirmed";
    request.confirmedBy = req.user._id;
    request.confirmedAt = new Date();
    await request.save();

    await grantEnrollmentAccess(request);

    res.status(200).json({
      success: true,
      message: "Payment confirmed and access granted",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin rejects a pending request
// @route  PUT /api/enrollment-requests/:id/reject
export const rejectEnrollmentRequest = async (req, res, next) => {
  try {
    const request = await EnrollmentRequest.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true },
    );
    if (!request) {
      const error = new Error("Enrollment request not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Enrollment request rejected",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin deletes an enrollment request (any status)
// @route  DELETE /api/enrollment-requests/:id
export const deleteEnrollmentRequest = async (req, res, next) => {
  try {
    const request = await EnrollmentRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      const error = new Error("Enrollment request not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Enrollment request deleted",
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin: total revenue from confirmed enrollment requests
// @route  GET /api/enrollment-requests/stats/revenue
export const getRevenueSummary = async (req, res, next) => {
  try {
    const result = await EnrollmentRequest.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);

    const summary = result[0] || { totalRevenue: 0, count: 0 };

    res.status(200).json({
      success: true,
      data: {
        totalRevenue: summary.totalRevenue,
        confirmedCount: summary.count,
      },
    });
  } catch (error) {
    next(error);
  }
};