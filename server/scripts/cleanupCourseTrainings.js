import "dotenv/config";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import connectDB from "../config/db.js";

// Run this ONCE, after seedTrainings.js has successfully populated the
// Training collection. Removes the 5 training categories from Course,
// leaving only Online Business + any future admin-uploaded courses there.
const TRAINING_CATEGORIES_TO_REMOVE = [
  "Networking",
  "AI & Digital Skills",
  "Technical Domains",
  "Non-Technical Domains",
  "Corporate Training",
];

const cleanup = async () => {
  await connectDB();

  const result = await Course.deleteMany({
    category: { $in: TRAINING_CATEGORIES_TO_REMOVE },
  });

  console.log(`Cleanup complete: removed ${result.deletedCount} training-category documents from Course.`);
};

try {
  await cleanup();
} catch (error) {
  console.error(`Cleanup failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}