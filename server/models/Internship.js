import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Internship title is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Technical", "Non-Technical", "Networking"],
      required: [true, "Category is required"],
    },
    tag: {
      type: String,
      trim: true,
    },
    iconName: {
      type: String,
      required: [true, "Icon name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    tools: {
      type: [String],
      default: [],
    },
    mode: {
      type: String,
      default: "Online",
    },
    price1Month: {
      type: Number,
      required: [true, "1-month price is required"],
    },
    price3Month: {
      type: Number,
      required: [true, "3-month price is required"],
    },
    price6Month: {
      type: Number,
      required: [true, "6-month price is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Internship", internshipSchema);