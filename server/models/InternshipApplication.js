import mongoose from "mongoose";

const internshipApplicationSchema = new mongoose.Schema(
  {
    internshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null, // null for guest applicants who weren't logged in
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    selectedDuration: {
      type: String,
      enum: ["1 Month", "3 Months", "6 Months"],
      required: [true, "Selected duration is required"],
    },
    selectedPrice: {
      type: Number,
      required: [true, "Selected price is required"], // snapshot of the price at application time, so later price changes don't retroactively alter past applications
    },
    cvUrl: {
      type: String,
      required: true,
    },
    cvPublicId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "enrolled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("InternshipApplication", internshipApplicationSchema);