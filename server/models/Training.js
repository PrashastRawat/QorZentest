import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true, // e.g. "AI & Digital Skills", "Technical Domains"
    },
    tag: {
      type: String,
      trim: true,
    },
    iconName: {
      type: String,
      trim: true, // matches a lucide-react export name, e.g. "ShieldCheck"
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    tools: {
      type: [String],
      default: [],
    },
    duration: {
      type: String, // e.g. "3 Months"
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    mode: {
      type: String,
      default: "Online",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Training = mongoose.model("Training", trainingSchema);

export default Training;
