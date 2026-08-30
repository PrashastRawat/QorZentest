import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "submitted", "graded"],
      default: "pending",
    },
    fileUrl: String,
    filePublicId: String,
    submittedAt: Date,
    grade: String,
    feedback: String,
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);