import "dotenv/config";
import mongoose from "mongoose";
import Course from "../models/Course.js";

const COURSE_ID = "6a7abecebbd9fba110c7ac5c"; // Complete Web Development Bootcamp

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const course = await Course.findByIdAndUpdate(
      COURSE_ID,
      {
        category: "Technical Domains",
        duration: "6 Months",
      },
      { new: true }
    );

    if (!course) {
      console.log("Course not found");
    } else {
      console.log("Updated course:", course.title, "-", course.category, "-", course.duration);
    }
  } catch (error) {
    console.error("Update error:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();