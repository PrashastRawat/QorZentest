// server/scripts/fixEnrollments.js
//
// One-off data-repair script. Run once with:
//   node server/scripts/fixEnrollments.js
//
// What it does, for every User:
//   1. For each id in User.purchasedCourses, checks whether a matching
//      Course document actually exists.
//        - If it does NOT exist: removes that id from User.purchasedCourses
//          (dangling reference — e.g. a deleted course, or bad seed data).
//        - If it DOES exist: ensures there's a corresponding entry in that
//          user's Student.enrolledCourses (creating the Student doc if
//          needed), so "My Courses" reflects it.
//   2. Also removes any Student.enrolledCourses entries whose courseId
//      doesn't resolve to a real Course (same dangling-reference cleanup,
//      on the Student side).
//
// This does NOT touch Training / purchasedTrainings — Student has no
// equivalent field for trainings yet (separate, known gap).
//
// The script only reports counts of documents changed — it doesn't print
// full document contents, since production data may include emails etc.
// Read the console summary after running to confirm what happened.

import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";

const run = async () => {
  await connectDB();

  const users = await User.find({ purchasedCourses: { $exists: true, $ne: [] } });

  let usersFixed = 0;
  let danglingRemovedFromUser = 0;
  let backfilledIntoStudent = 0;
  let danglingRemovedFromStudent = 0;

  for (const user of users) {
    let userChanged = false;
    const validCourseIds = [];

    // Step 1: validate each purchasedCourses id against the Course collection.
    for (const courseId of user.purchasedCourses) {
      const course = await Course.findById(courseId).select("_id");
      if (course) {
        validCourseIds.push(courseId);
      } else {
        danglingRemovedFromUser += 1;
        userChanged = true;
      }
    }

    if (userChanged) {
      user.purchasedCourses = validCourseIds;
      await user.save();
      usersFixed += 1;
    }

    if (validCourseIds.length === 0) continue;

    // Step 2: make sure each valid course is reflected in Student.enrolledCourses.
    let studentDoc = await Student.findOne({ userId: user._id });
    if (!studentDoc) {
      studentDoc = await Student.create({ userId: user._id, enrolledCourses: [] });
    }

    // Also clean any dangling entries already sitting in enrolledCourses.
    const beforeCount = studentDoc.enrolledCourses.length;
    studentDoc.enrolledCourses = studentDoc.enrolledCourses.filter((e) =>
      validCourseIds.some((id) => id.toString() === e.courseId?.toString())
      || e.courseId // keep for now, we re-check below with a fresh query per entry
    );

    // Re-check remaining entries individually against Course collection
    // (covers the case where courseId isn't in purchasedCourses at all,
    // just a stray bad reference directly in enrolledCourses).
    const stillValid = [];
    for (const entry of studentDoc.enrolledCourses) {
      if (!entry.courseId) continue;
      const course = await Course.findById(entry.courseId).select("_id");
      if (course) {
        stillValid.push(entry);
      }
    }
    danglingRemovedFromStudent += beforeCount - stillValid.length;
    studentDoc.enrolledCourses = stillValid;

    // Backfill: add any valid purchasedCourses id missing from enrolledCourses.
    for (const courseId of validCourseIds) {
      const alreadyPresent = studentDoc.enrolledCourses.some(
        (e) => e.courseId?.toString() === courseId.toString()
      );
      if (!alreadyPresent) {
        studentDoc.enrolledCourses.push({
          courseId,
          enrolledAt: new Date(),
          progress: 0,
        });
        backfilledIntoStudent += 1;
      }
    }

    await studentDoc.save();
  }

  console.log("Done.");
  console.log(`Users with dangling purchasedCourses cleaned: ${usersFixed}`);
  console.log(`Dangling ids removed from User.purchasedCourses: ${danglingRemovedFromUser}`);
  console.log(`Dangling entries removed from Student.enrolledCourses: ${danglingRemovedFromStudent}`);
  console.log(`Valid courses backfilled into Student.enrolledCourses: ${backfilledIntoStudent}`);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});