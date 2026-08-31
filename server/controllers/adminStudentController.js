import Student from "../models/Student.js";
import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
import LiveClass from "../models/LiveClass.js";
import Attendance from "../models/Attendance.js";
import EnrollmentRequest from "../models/EnrollmentRequest.js";
import InternshipApplication from "../models/InternshipApplication.js";

// @desc   Admin: full student directory for the Manage Students panel —
//         every enrolled program per student, with real progress,
//         assignment completion, attendance, fee status, and certificate
//         status. Deliberately built with plain queries + JS joins rather
//         than one giant aggregation pipeline, so each piece stays easy to
//         reason about — at current student counts (hundreds, not
//         hundreds of thousands) this is fine. If this ever gets slow,
//         the aggregation should move server-side into Mongo.
// @route  GET /api/student/admin/directory
export const getManageStudentsDirectory = async (req, res, next) => {
  try {
    const students = await Student.find({})
      .populate("userId", "name email")
      .populate("enrolledCourses.courseId", "title category")
      .populate("enrolledTrainings.trainingId", "title category")
      .populate("enrolledInternships.internshipId", "title category");

    // Assignments are only a Course concept right now (Assignment.courseId
    // only references Course — Training/Internship have no assignment
    // structure), so completion is computed per course.
    const allAssignments = await Assignment.find({}).select("_id courseId");
    const assignmentsByCourse = new Map();
    for (const a of allAssignments) {
      const key = a.courseId.toString();
      if (!assignmentsByCourse.has(key)) assignmentsByCourse.set(key, []);
      assignmentsByCourse.get(key).push(a._id.toString());
    }

    const allSubmissions = await Submission.find({}).select("studentId assignmentId status");
    const submissionsByStudent = new Map();
    for (const s of allSubmissions) {
      const key = s.studentId.toString();
      if (!submissionsByStudent.has(key)) submissionsByStudent.set(key, []);
      submissionsByStudent.get(key).push(s);
    }

    // Attendance is only meaningful for Course/Training (LiveClass doesn't
    // support internships). Pull every live class + attendance record once,
    // then compute per-student, per-item percentages in memory.
    const allLiveClasses = await LiveClass.find({}).select("_id itemType itemId");
    const liveClassesByItem = new Map(); // key: "course:<id>" or "training:<id>"
    for (const lc of allLiveClasses) {
      const key = `${lc.itemType}:${lc.itemId.toString()}`;
      if (!liveClassesByItem.has(key)) liveClassesByItem.set(key, []);
      liveClassesByItem.get(key).push(lc._id.toString());
    }
    const allAttendance = await Attendance.find({}).select("liveClassId studentId status");
    const attendanceByStudent = new Map();
    for (const rec of allAttendance) {
      const key = rec.studentId.toString();
      if (!attendanceByStudent.has(key)) attendanceByStudent.set(key, []);
      attendanceByStudent.get(key).push(rec);
    }

    // Fee paid: sum of confirmed EnrollmentRequest amounts (course/training)
    // keyed by the User id (EnrollmentRequest.student refs User, not Student)
    // plus confirmed InternshipApplication selectedPrice keyed by Student id.
    const confirmedRequests = await EnrollmentRequest.find({ status: "confirmed" }).select(
      "student amount"
    );
    const feeByUser = new Map();
    for (const r of confirmedRequests) {
      const key = r.student.toString();
      feeByUser.set(key, (feeByUser.get(key) || 0) + r.amount);
    }
    const enrolledApplications = await InternshipApplication.find({ status: "enrolled" }).select(
      "studentId selectedPrice"
    );
    const feeByStudent = new Map();
    for (const app of enrolledApplications) {
      if (!app.studentId) continue;
      const key = app.studentId.toString();
      feeByStudent.set(key, (feeByStudent.get(key) || 0) + app.selectedPrice);
    }

    const directory = students
      .filter((s) => s.userId) // guard against orphaned Student docs
      .map((s) => {
        const studentIdStr = s._id.toString();
        const userIdStr = s.userId._id.toString();

        const buildProgram = (entry, idField, refField, type) => {
          const item = entry[refField];
          if (!item) return null; // ref no longer exists (deleted course/training/internship)

          let assignmentsCompleted = null;
          let assignmentsTotal = null;
          if (type === "course") {
            const total = assignmentsByCourse.get(item._id.toString()) || [];
            assignmentsTotal = total.length;
            const mySubs = submissionsByStudent.get(studentIdStr) || [];
            assignmentsCompleted = mySubs.filter(
              (sub) =>
                total.includes(sub.assignmentId.toString()) &&
                (sub.status === "submitted" || sub.status === "graded")
            ).length;
          }

          let attendancePercent = null;
          if (type === "course" || type === "training") {
            const liveClassIds = liveClassesByItem.get(`${type}:${item._id.toString()}`) || [];
            if (liveClassIds.length > 0) {
              const myAttendance = attendanceByStudent.get(studentIdStr) || [];
              const presentCount = myAttendance.filter(
                (a) => liveClassIds.includes(a.liveClassId.toString()) && a.status === "present"
              ).length;
              attendancePercent = Math.round((presentCount / liveClassIds.length) * 100);
            }
          }

          // Certificates only exist as a concept for Course right now
          // (Student.certificate[] is keyed by courseId only — Training and
          // Internship have no certificate field at all). Rather than fake a
          // status for those, this stays null and the frontend must show
          // "N/A", not "Not Issued" (which would imply it's a real gap).
          let certificateStatus = null;
          if (type === "course") {
            const issued = (s.certificate || []).some(
              (c) => c.courseId && c.courseId.toString() === item._id.toString()
            );
            if (issued) {
              certificateStatus = "issued";
            } else if ((entry.progress || 0) >= 100 && assignmentsTotal > 0 && assignmentsCompleted === assignmentsTotal) {
              certificateStatus = "eligible"; // meets the criteria, but no issuance mechanism exists yet
            } else {
              certificateStatus = "in_progress";
            }
          }

          return {
            type,
            id: item._id,
            title: item.title,
            category: item.category || null,
            progress: entry.progress || 0,
            assignmentsCompleted,
            assignmentsTotal,
            attendancePercent, // null when no live classes have been held yet
            certificateStatus, // "issued" | "eligible" | "in_progress" | null (course only)
          };
        };

        const programs = [
          ...s.enrolledCourses.map((e) => buildProgram(e, "courseId", "courseId", "course")).filter(Boolean),
          ...s.enrolledTrainings
            .map((e) => buildProgram(e, "trainingId", "trainingId", "training"))
            .filter(Boolean),
          ...s.enrolledInternships
            .map((e) => buildProgram(e, "internshipId", "internshipId", "internship"))
            .filter(Boolean),
        ];

        const feePaid = (feeByUser.get(userIdStr) || 0) + (feeByStudent.get(studentIdStr) || 0);

        const certificatesIssued = (s.certificate || []).length;

        return {
          studentId: s._id,
          userId: s.userId._id,
          name: s.userId.name,
          email: s.userId.email,
          programs,
          feePaid,
          certificatesIssued,
        };
      });

    res.status(200).json({ success: true, count: directory.length, data: directory });
  } catch (error) {
    next(error);
  }
};
