// server/scripts/updateInternshipPricing.js
//
// One-time correction script: sets the same real (charged) duration pricing
// on every existing Internship document, per the agency's new pricing:
//   1 Month  -> ₹499
//   3 Months -> ₹999
//   6 Months -> ₹1,499
// These are the actual amounts charged/recorded — the struck-through
// "80% OFF" original price shown on the site is computed dynamically in
// InternshipDetails.jsx (real price × 5), not stored here.
//
// Run from the server/ folder:
//   node scripts/updateInternshipPricing.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Internship from "../models/Internship.js";

dotenv.config();

const PRICE_1_MONTH = 499;
const PRICE_3_MONTH = 999;
const PRICE_6_MONTH = 1499;

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", mongoose.connection.host);

    const result = await Internship.updateMany(
      {},
      {
        $set: {
          price1Month: PRICE_1_MONTH,
          price3Month: PRICE_3_MONTH,
          price6Month: PRICE_6_MONTH,
        },
      },
    );

    console.log(
      `Internship pricing updated: ${result.modifiedCount} of ${result.matchedCount} documents set to ₹${PRICE_1_MONTH} / ₹${PRICE_3_MONTH} / ₹${PRICE_6_MONTH}.`,
    );
  } catch (err) {
    console.error("Error updating internship pricing:", err);
  } finally {
    await mongoose.disconnect();
  }
};

run();
