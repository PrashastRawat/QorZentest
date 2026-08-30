import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/Service.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const result = await Service.updateOne(
    { title: "Website development", slug: null },
    { $set: { slug: "website-development" } }
  );

  console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});