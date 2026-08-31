import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrolledCourses: [
      {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        enrolledAt: Date,
        progress: Number,
      },
    ],
    completedLessons: [mongoose.Schema.Types.ObjectId],
    assignments: [
      { assignmentId: mongoose.Schema.Types.ObjectId, status: String },
    ],
    certificate: [
      {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        credentialId: String,
        issuedAt: Date,
      },
    ],
    enrolledTrainings: [
      {
        trainingId: { type: mongoose.Schema.Types.ObjectId, ref: "Training" },
        enrolledAt: Date,
        progress: Number,
      },
    ],
    enrolledInternships: [
      {
        internshipId: { type: mongoose.Schema.Types.ObjectId, ref: "Internship" },
        applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "InternshipApplication" },
        selectedDuration: String, // "1 Month" / "3 Months" / "6 Months", snapshot from the application
        enrolledAt: Date,
        progress: Number,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Student", studentSchema);
