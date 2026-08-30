import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import LiveClass from "../models/LiveClass.js";
import Notification from "../models/Notification.js";


export const getStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }
    res.json({ enrolledCoursesCount: student.enrolledCourses.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id }).populate(
      "enrolledCourses.courseId",
    );
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }
    res.json(student.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markLessonCompleted = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const student = await Student.findOne({ userId: req.user._id });

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const alreadyCompleted = student.completedLessons.some(
      (id) => id.toString() === lessonId,
    );

    if (!alreadyCompleted) {
      student.completedLessons.push(lessonId);
    }

    // Find which course this lesson belongs to, so we can recalculate that course's progress
    const course = await Course.findOne({ "lessons._id": lessonId });

    if (course) {
      const courseLessonIds = course.lessons.map((l) => l._id.toString());
      const completedIds = student.completedLessons.map((id) => id.toString());

      const completedInCourse = courseLessonIds.filter((id) =>
        completedIds.includes(id),
      ).length;
      const totalInCourse = courseLessonIds.length;
      const progress =
        totalInCourse > 0
          ? Math.round((completedInCourse / totalInCourse) * 100)
          : 0;

      const enrollment = student.enrolledCourses.find(
        (e) => e.courseId.toString() === course._id.toString(),
      );

      if (enrollment) {
        enrollment.progress = progress;
      }
    }

    await student.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseLessons = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const student = await Student.findOne({ userId: req.user._id });
    const completedIds = (student?.completedLessons || []).map((id) =>
      id.toString(),
    );

    const lessons = course.lessons.map((lesson) => ({
      _id: lesson._id,
      title: lesson.title,
      videoUrl: lesson.videoUrl,
      duration: lesson.duration,
      isCompleted: completedIds.includes(lesson._id.toString()),
    }));

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const courseIds = student.enrolledCourses.map((c) => c.courseId);

    const assignments = await Assignment.find({
      courseId: { $in: courseIds },
    }).populate("courseId", "title");

    const submissions = await Submission.find({ studentId: student._id });

    const result = assignments.map((assignment) => {
      const submission = submissions.find(
        (s) => s.assignmentId.toString() === assignment._id.toString(),
      );

      return {
        _id: assignment._id,
        title: assignment.title,
        description: assignment.description,
        courseName: assignment.courseId?.title || "Unknown Course",
        dueDate: assignment.dueDate,
        maxMarks: assignment.maxMarks,
        briefUrl: assignment.briefUrl || null,
        status: submission?.status || "pending",
        grade: submission?.grade || null,
        feedback: submission?.feedback || null,
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitAssignment = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "A file is required to submit" });
    }

    const { url, publicId } = await uploadToCloudinary(
      req.file.buffer,
      "qorzen/submissions",
    );

    const submission = await Submission.findOneAndUpdate(
      { studentId: student._id, assignmentId: assignment._id },
      {
        status: "submitted",
        fileUrl: url,
        filePublicId: publicId,
        submittedAt: new Date(),
      },
      { upsert: true, new: true },
    );

    res.json({ success: true, submission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id }).populate(
      "enrolledCourses.courseId",
    );
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const progress = student.enrolledCourses
      .filter((course) => course.courseId)
      .map((course) => ({
        courseId: course.courseId._id,
        courseName: course.courseId.title,
        progress: course.progress || 0,
      }));

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }
    res.json(student.certificate || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyCertificate = async (req, res) => {
  try {
    const student = await Student.findOne({
      "certificate.credentialId": req.params.credentialId,
    });
    if (student) {
      const cert = student.certificate.find(
        (c) => c.credentialId === req.params.credentialId,
      );
      res.json({ valid: true, certificate: cert });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const markNotificationRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.notificationId, user: req.user._id },
            { read: true },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLiveClasses = async (req, res) => {
    try {
        const student = await Student.findOne({ userId: req.user._id });
        if (!student) {
            return res.status(404).json({ message: "Student profile not found" });
        }

        const courseIds = student.enrolledCourses.map(c => c.courseId);
        const trainingIds = (student.enrolledTrainings || []).map(t => t.trainingId);

        const liveClasses = await LiveClass.find({
            $or: [
                { itemType: 'course', itemId: { $in: courseIds } },
                { itemType: 'training', itemId: { $in: trainingIds } },
            ],
        })
            .populate('itemId')
            .sort({ scheduledAt: 1 });

        const now = new Date();
        const result = liveClasses.map((lc) => {
            const start = new Date(lc.scheduledAt);
            const end = new Date(start.getTime() + (lc.durationMinutes || 60) * 60000);
            let status = 'Upcoming';
            if (now >= start && now <= end) status = 'Live';
            else if (now > end) status = lc.recordingUrl ? 'Recorded' : 'Ended';

            return {
                _id: lc._id,
                title: lc.title,
                description: lc.description,
                itemType: lc.itemType,
                itemTitle: lc.itemId?.title || 'Unknown',
                scheduledAt: lc.scheduledAt,
                durationMinutes: lc.durationMinutes,
                meetingLink: lc.meetingLink,
                recordingUrl: lc.recordingUrl || null,
                status,
            };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEnrolledTrainings = async (req, res) => {
    try {
        const student = await Student.findOne({ userId: req.user._id }).populate('enrolledTrainings.trainingId');
        if (!student) {
            return res.status(404).json({ message: "Student profile not found" });
        }
        res.json(student.enrolledTrainings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({
            _id: req.params.notificationId,
            user: req.user._id,
        });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json({ success: true, message: "Notification deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};