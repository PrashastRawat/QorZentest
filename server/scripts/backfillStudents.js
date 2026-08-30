import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";
import Student from "../models/Student.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for backfill");

    const users = await User.find({});
    console.log(`Found ${users.length} total users`);

    let created = 0;
    let skipped = 0;

    for (const user of users) {
      const existing = await Student.findOne({ userId: user._id });
      if (existing) {
        skipped++;
        continue;
      }
      await Student.create({ userId: user._id });
      created++;
      console.log(`Created Student for: ${user.email}`);
    }

    console.log(`Done. Created: ${created}, Skipped (already existed): ${skipped}`);
  } catch (error) {
    console.error("Backfill error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    process.exit(0);
  }
};

run();