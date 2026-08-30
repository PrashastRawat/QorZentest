// server/scripts/updateTrainingPricing.js
//
// One-time correction script: updates duration (and one price) fields on
// existing Training documents to match the official pricing lists/images
// provided by the agency. Matches by exact `title`, only touches the
// fields listed for each entry (leaves everything else untouched).
//
// Run from the server/ folder:
//   node scripts/updateTrainingPricing.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Training from "../models/Training.js";

dotenv.config();

const corrections = [
  // ---- Technical Domains ----
  { title: ".NET Development", duration: "5 Months" },
  { title: "Python Development", duration: "4 Months" },
  { title: "Advanced Excel", duration: "2 Months" },
  { title: "Flutter Development", duration: "5 Months" },
  { title: "Data Visualization (Power BI)", duration: "2 Months" },
  { title: "Data Analytics", duration: "4 Months" },
  { title: "Web Development", duration: "4 Months" },
  { title: "WordPress Development", duration: "2 Months" },
  { title: "SEO", duration: "2 Months" },
  { title: "Backend Development", duration: "4 Months" },
  { title: "MS SQL", duration: "2 Months" },
  { title: "UI/UX Design", price: 8999 }, // real price conflict: DB had 6999

  // ---- Corporate Training ----
  { title: "IT Department & Corporate Technology Basics", duration: "1.5 Month" },
  { title: "Digital Marketing & Corporate Marketing", duration: "1.5 Month" },
  { title: "Project Handling, Agile & Team Coordination", duration: "1.5 Month" },

  // ---- Networking ----
  { title: "CCNA + CCNA Security", duration: "5 Months" },
  { title: "Computer Fundamentals", duration: "1.5 Month" },
  { title: "TCP/IP Masterclass", duration: "2 Months" },
  { title: "Cisco CCNA (200-301)", duration: "4 Months" },
  { title: "Network Engineering", duration: "4 Months" },
  { title: "Cloud and Networking Pro", duration: "4 Months" },
  { title: "Network Security & Firewall Expert", duration: "4.5 Months" },
  { title: "Enterprise Networking Masterclass", duration: "5 Months" },
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", mongoose.connection.host);

    let updated = 0;
    let notFound = 0;

    for (const { title, ...fields } of corrections) {
      const result = await Training.findOneAndUpdate(
        { title },
        { $set: fields },
        { new: true }
      );

      if (result) {
        updated++;
        console.log(`Updated: "${title}" ->`, fields);
      } else {
        notFound++;
        console.warn(`NOT FOUND (check exact title spelling): "${title}"`);
      }
    }

    console.log(
      `\nPricing correction complete: ${updated} updated, ${notFound} not found, ${corrections.length} processed.`
    );
  } catch (err) {
    console.error("Error updating training pricing:", err);
  } finally {
    await mongoose.disconnect();
  }
};

run();
