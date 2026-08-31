// One-time seed: populates the Category collection so the admin's
// category-order/trending manager and the public CourseCategoryBrowser
// have real starting data instead of an empty list.
// Run with: node server/scripts/seedCategories.js
import "dotenv/config";
import mongoose from "mongoose";
import Category from "../models/Category.js";
import connectDB from "../config/db.js";

const trainingCategories = [
  { name: "AI & Digital Skills", label: "AI Tools", scope: "training", order: 0, trending: true },
  { name: "Technical Domains", label: "Technical", scope: "training", order: 1, trending: false },
  { name: "Non-Technical Domains", label: "Non-Technical", scope: "training", order: 2, trending: false },
  { name: "Networking", label: "Networking", scope: "training", order: 3, trending: false },
  { name: "Corporate Training", label: "Corporate Training", scope: "training", order: 4, trending: false },
];

const courseCategories = [
  { name: "AI & Digital Skills", label: "AI Tools", scope: "course", order: 0, trending: true },
  { name: "Online Business", label: "Online Business", scope: "course", order: 1, trending: false },
];

const run = async () => {
  await connectDB();

  for (const cat of [...trainingCategories, ...courseCategories]) {
    await Category.findOneAndUpdate(
      { name: cat.name, scope: cat.scope },
      cat,
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  console.log(`Seeded ${trainingCategories.length} training categories and ${courseCategories.length} course categories.`);
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Category seed failed:", err);
  process.exit(1);
});
