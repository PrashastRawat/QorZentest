import EnrollmentRequest from "../models/EnrollmentRequest.js";
import Course from "../models/Course.js";
import Training from "../models/Training.js";
import Internship from "../models/Internship.js";
import InternshipApplication from "../models/InternshipApplication.js";
import User from "../models/User.js";
import Student from "../models/Student.js"; 
import ServicePayment from "../models/ServicePayment.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// ---- Date helpers for the revenue dashboard (week/month/year buckets) ----

// ISO-ish: weeks start Monday. Returns the Monday 00:00:00 for a given date.
const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun ... 6 = Sat
  const diff = (day === 0 ? -6 : 1) - day; // shift back to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const startOfMonth = (date) => {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addMonths = (date, months) => {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
};

const startOfYear = (date) => {
  const d = new Date(date.getFullYear(), 0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addYears = (date, years) => new Date(date.getFullYear() + years, 0, 1);

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// ISO week number, used only for display labels like "Week 34"
const getISOWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const pctChange = (current, previous) => {
  if (!previous) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

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
// @desc   Full revenue dashboard summary for the admin "Revenue & Payments
//         Management" page — combines confirmed EnrollmentRequests
//         (course/training/internship) with paid ServicePayments (services),
//         and returns totals, today/week/month/year figures with
//         period-over-period comparisons, trend series for the charts, and
//         a per-stream breakdown (course/training/internship/services).
// @route  GET /api/enrollment-requests/stats/revenue
export const getRevenueSummary = async (req, res, next) => {
  try {
        const [enrollments, servicePayments] = await Promise.all([
      EnrollmentRequest.find({ status: "confirmed" })
        .select("itemType amount confirmedAt createdAt itemTitle")
        .lean(),
      ServicePayment.find({ status: "Paid" })
        .select("amount paidAt projectTitle")
        .lean(),
      InternshipApplication.find({ status: "enrolled" })
        .select("selectedPrice updatedAt createdAt")
        .lean(),
    ]);

    // Normalize both sources into one shape: { amount, date, stream }
    const entries = [
      ...enrollments.map((e) => ({
        amount: e.amount || 0,
        date: new Date(e.confirmedAt || e.createdAt),
        stream: e.itemType, // "course" | "training" | "internship"
      })),
      ...servicePayments.map((s) => ({
        amount: s.amount || 0,
        date: new Date(s.paidAt),
        stream: "service",
      })),
    ];

    const now = new Date();

    const sumBetween = (from, to) =>
      entries
        .filter((e) => e.date >= from && e.date < to)
        .reduce((acc, e) => acc + e.amount, 0);

    const countBetween = (from, to) =>
      entries.filter((e) => e.date >= from && e.date < to).length;

    // ---- Totals ----
    const totalRevenue = entries.reduce((acc, e) => acc + e.amount, 0);
    const confirmedCount = entries.length;

    // ---- Today ----
    const todayStart = startOfDay(now);
    const tomorrowStart = addDays(todayStart, 1);
    const todayRevenue = sumBetween(todayStart, tomorrowStart);
    const todayCount = countBetween(todayStart, tomorrowStart);

    // ---- This week vs previous week ----
    const weekStart = startOfWeek(now);
    const nextWeekStart = addDays(weekStart, 7);
    const prevWeekStart = addDays(weekStart, -7);
    const thisWeekRevenue = sumBetween(weekStart, nextWeekStart);
    const prevWeekRevenue = sumBetween(prevWeekStart, weekStart);

    // ---- This month vs previous month ----
    const monthStart = startOfMonth(now);
    const nextMonthStart = addMonths(monthStart, 1);
    const prevMonthStart = addMonths(monthStart, -1);
    const thisMonthRevenue = sumBetween(monthStart, nextMonthStart);
    const prevMonthRevenue = sumBetween(prevMonthStart, monthStart);

    // ---- This year vs previous year ----
    const yearStart = startOfYear(now);
    const nextYearStart = addYears(yearStart, 1);
    const prevYearStart = addYears(yearStart, -1);
    const thisYearRevenue = sumBetween(yearStart, nextYearStart);
    const prevYearRevenue = sumBetween(prevYearStart, yearStart);

    // ---- Weekly trend: current week + previous 3 weeks (4 total, oldest first) ----
    const weeklyTrend = [];
    for (let i = 3; i >= 0; i--) {
      const from = addDays(weekStart, -7 * i);
      const to = addDays(from, 7);
      const revenue = sumBetween(from, to);
      const prevRevenue = sumBetween(addDays(from, -7), from);
      weeklyTrend.push({
        label: i === 0 ? "Current" : `Week ${getISOWeekNumber(from)}`,
        weekNumber: getISOWeekNumber(from),
        revenue,
        changePct: pctChange(revenue, prevRevenue),
      });
    }

    // ---- Monthly trend: current month + previous 5 months (6 total, oldest first) ----
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const from = addMonths(monthStart, -i);
      const to = addMonths(from, 1);
      const revenue = sumBetween(from, to);
      const prevRevenue = sumBetween(addMonths(from, -1), from);
      monthlyTrend.push({
        label: `${MONTH_NAMES[from.getMonth()]} ${from.getFullYear()}`,
        revenue,
        changePct: pctChange(revenue, prevRevenue),
      });
    }

    // ---- Yearly trend: current year + previous 2 years (3 total, oldest first) ----
    const yearlyTrend = [];
    for (let i = 2; i >= 0; i--) {
      const from = addYears(yearStart, -i);
      const to = addYears(from, 1);
      const revenue = sumBetween(from, to);
      const prevRevenue = sumBetween(addYears(from, -1), from);
      yearlyTrend.push({
        label: String(from.getFullYear()),
        revenue,
        changePct: pctChange(revenue, prevRevenue),
      });
    }

    // ---- Streams breakdown (course / training / internship / services) ----
    const streamKeys = ["course", "training", "internship", "service"];
    const streamTotals = {};
    streamKeys.forEach((key) => {
      const streamEntries = entries.filter((e) => e.stream === key);
      streamTotals[key] = {
        revenue: streamEntries.reduce((acc, e) => acc + e.amount, 0),
        count: streamEntries.length,
      };
    });

    const streams = streamKeys.map((key) => ({
      key,
      label:
        key === "course"
          ? "Online Courses"
          : key === "training"
          ? "Corporate & Tech Training"
          : key === "internship"
          ? "Internship Programs"
          : "Services & Client Projects",
      revenue: streamTotals[key].revenue,
      count: streamTotals[key].count,
      percentage: totalRevenue > 0 ? Number(((streamTotals[key].revenue / totalRevenue) * 100).toFixed(1)) : 0,
    }));

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        confirmedCount,
        today: { revenue: todayRevenue, count: todayCount },
        thisWeek: {
          revenue: thisWeekRevenue,
          weekNumber: getISOWeekNumber(now),
          changePct: pctChange(thisWeekRevenue, prevWeekRevenue),
          prevRevenue: prevWeekRevenue,
        },
        thisMonth: {
          revenue: thisMonthRevenue,
          label: `${MONTH_NAMES[monthStart.getMonth()]} ${monthStart.getFullYear()}`,
          prevLabel: `${MONTH_NAMES[prevMonthStart.getMonth()]} ${prevMonthStart.getFullYear()}`,
          changePct: pctChange(thisMonthRevenue, prevMonthRevenue),
          prevRevenue: prevMonthRevenue,
        },
        thisYear: {
          revenue: thisYearRevenue,
          changePct: pctChange(thisYearRevenue, prevYearRevenue),
          prevRevenue: prevYearRevenue,
        },
        weeklyTrend,
        monthlyTrend,
        yearlyTrend,
        streams,
      },
    });
  } catch (error) {
    next(error);
  }
};