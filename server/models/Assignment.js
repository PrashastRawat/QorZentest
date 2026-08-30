import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Assignment title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Assignment description is required"],
      trim: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    maxMarks: {
      type: Number,
      default: 100,
    },
    briefUrl: String,
    briefPublicId: String,
  },
  { timestamps: true },
);

export default mongoose.model("Assignment", assignmentSchema);