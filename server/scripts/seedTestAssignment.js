import "dotenv/config";
import mongoose from "mongoose";
import Student from "../models/Student.js";
import Assignment from "../models/Assignment.js";

const BUYER_USER_ID = "6a7abf78bbd9fba110c7ac63"; // buyer@example.com's real User _id
const COURSE_ID = "6a7abecebbd9fba110c7ac5c"; // Complete Web Development Bootcamp

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const student = await Student.findOne({ userId: BUYER_USER_ID });
    if (!student) {
      console.log("No Student found for that userId — aborting");
      process.exit(1);
    }

    student.enrolledCourses = [
      {
        courseId: COURSE_ID,
        enrolledAt: new Date(),
        progress: 0,
      },
    ];
    student.assignments = [];
    await student.save();
    console.log("Student.enrolledCourses fixed, Student.assignments cleared");

    await Assignment.deleteMany({ title: "Build a Todo List Component" });
    const assignment = await Assignment.create({
      title: "Build a Todo List Component",
      description:
        "Create a React component that lets users add, complete, and delete todo items.",
      courseId: COURSE_ID,
      dueDate: new Date("2026-09-15"),
      maxMarks: 100,
    });
    console.log("Assignment created:", assignment._id.toString());

    console.log("Done.");
  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
