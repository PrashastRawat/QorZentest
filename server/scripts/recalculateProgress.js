import "dotenv/config";
import mongoose from "mongoose";
import Student from "../models/Student.js";
import Course from "../models/Course.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const students = await Student.find({});
    console.log(`Found ${students.length} students`);

    for (const student of students) {
      const completedIds = student.completedLessons.map(id => id.toString());
      let changed = false;

      for (const enrollment of student.enrolledCourses) {
        const course = await Course.findById(enrollment.courseId);
        if (!course) continue;

        const courseLessonIds = course.lessons.map(l => l._id.toString());
        const completedInCourse = courseLessonIds.filter(id => completedIds.includes(id)).length;
        const totalInCourse = courseLessonIds.length;
        const progress = totalInCourse > 0
          ? Math.round((completedInCourse / totalInCourse) * 100)
          : 0;

        if (enrollment.progress !== progress) {
          console.log(`  ${student.userId}: course ${course.title} -> ${progress}%`);
          enrollment.progress = progress;
          changed = true;
        }
      }

      if (changed) {
        await student.save();
      }
    }

    console.log("Done.");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();