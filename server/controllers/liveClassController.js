import LiveClass from "../models/LiveClass.js";
import Student from "../models/Student.js";
import Notification from "../models/Notification.js";
import Course from "../models/Course.js";
import Training from "../models/Training.js";

// @desc   Admin creates a live class for a course or training
// @route  POST /api/live-classes
export const createLiveClass = async (req, res, next) => {
  try {
    const { title, description, itemType, itemId, scheduledAt, durationMinutes, meetingLink } = req.body;

    if (!["course", "training"].includes(itemType)) {
      const error = new Error("itemType must be 'course' or 'training'");
      error.statusCode = 400;
      throw error;
    }

    const Model = itemType === "course" ? Course : Training;
    const item = await Model.findById(itemId);
    if (!item) {
      const error = new Error(`${itemType} not found`);
      error.statusCode = 404;
      throw error;
    }

    const liveClass = await LiveClass.create({
      title,
      description,
      itemType,
      itemId,
      itemModel: itemType === "course" ? "Course" : "Training",
      scheduledAt,
      durationMinutes: durationMinutes || 60,
      meetingLink,
      createdBy: req.user._id,
    });

    // Notify every student enrolled in this course/training.
    const enrollField = itemType === "course" ? "enrolledCourses.courseId" : "enrolledTrainings.trainingId";
    const enrolledStudents = await Student.find({ [enrollField]: itemId }).select("userId");

    if (enrolledStudents.length > 0) {
      const notifications = enrolledStudents.map((s) => ({
        user: s.userId,
        title: "New Live Class Scheduled",
        message: `"${title}" is scheduled for ${new Date(scheduledAt).toLocaleString()}.`,
        type: "live_class",
        relatedId: liveClass._id,
      }));
      await Notification.insertMany(notifications);
    }

    res.status(201).json({ success: true, data: liveClass });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin lists live classes for one course/training
// @route  GET /api/live-classes/item/:itemType/:itemId
export const getLiveClassesForItem = async (req, res, next) => {
  try {
    const { itemType, itemId } = req.params;
    const liveClasses = await LiveClass.find({ itemType, itemId }).sort({ scheduledAt: -1 });
    res.status(200).json({ success: true, data: liveClasses });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin deletes a live class
// @route  DELETE /api/live-classes/:id
export const deleteLiveClass = async (req, res, next) => {
  try {
    const liveClass = await LiveClass.findByIdAndDelete(req.params.id);
    if (!liveClass) {
      const error = new Error("Live class not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, message: "Live class deleted" });
  } catch (error) {
    next(error);
  }
};