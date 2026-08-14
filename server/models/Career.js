import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      default: "Full-time",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    requirements: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Career = mongoose.model("Career", careerSchema);

export default Career;