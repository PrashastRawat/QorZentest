import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
import Course from "../models/Course.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// @desc   Admin creates an assignment for a course
// @route  POST /api/assignments/course/:courseId
export const createAssignment = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { title, description, dueDate, maxMarks } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }

    let briefUrl, briefPublicId;
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer, "qorzen/assignment-briefs");
      briefUrl = uploaded.url;
      briefPublicId = uploaded.publicId;
    }

    const assignment = await Assignment.create({
      title,
      description,
      courseId,
      dueDate,
      maxMarks: maxMarks || 100,
      briefUrl,
      briefPublicId,
    });

    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin lists all assignments for one course
// @route  GET /api/assignments/course/:courseId
export const getAssignmentsForCourse = async (req, res, next) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.courseId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin updates an assignment (optionally replacing the brief file)
// @route  PUT /api/assignments/:id
export const updateAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      const error = new Error("Assignment not found");
      error.statusCode = 404;
      throw error;
    }

    const { title, description, dueDate, maxMarks } = req.body;
    if (title !== undefined) assignment.title = title;
    if (description !== undefined) assignment.description = description;
    if (dueDate !== undefined) assignment.dueDate = dueDate;
    if (maxMarks !== undefined) assignment.maxMarks = maxMarks;

    if (req.file) {
      // NOTE: the old brief file on Cloudinary is left in place (orphaned) —
      // there's no deleteFromCloudinary util in this codebase yet. Flagging
      // rather than guessing at one; cheap to add later if storage costs matter.
      const uploaded = await uploadToCloudinary(req.file.buffer, "qorzen/assignment-briefs");
      assignment.briefUrl = uploaded.url;
      assignment.briefPublicId = uploaded.publicId;
    }

    await assignment.save();
    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin deletes an assignment — blocked if students already submitted
// @route  DELETE /api/assignments/:id
export const deleteAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      const error = new Error("Assignment not found");
      error.statusCode = 404;
      throw error;
    }

    const submissionCount = await Submission.countDocuments({ assignmentId: assignment._id });
    if (submissionCount > 0) {
      const error = new Error(
        `Cannot delete: ${submissionCount} student submission(s) already exist for this assignment.`
      );
      error.statusCode = 409;
      throw error;
    }

    await assignment.deleteOne();
    res.status(200).json({ success: true, message: "Assignment deleted" });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin lists all student submissions for one assignment (to grade them)
// @route  GET /api/assignments/:id/submissions
export const getSubmissionsForAssignment = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ assignmentId: req.params.id })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .sort({ submittedAt: -1 });
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin grades a single submission
// @route  PUT /api/assignments/submissions/:submissionId/grade
export const gradeSubmission = async (req, res, next) => {
  try {
    const { grade, feedback } = req.body;
    if (!grade) {
      const error = new Error("A grade value is required");
      error.statusCode = 400;
      throw error;
    }

    const submission = await Submission.findByIdAndUpdate(
      req.params.submissionId,
      { grade, feedback: feedback || "", status: "graded" },
      { new: true }
    );
    if (!submission) {
      const error = new Error("Submission not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: submission });
  } catch (error) {
    next(error);
  }
};