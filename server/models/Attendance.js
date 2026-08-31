import mongoose from "mongoose";

// One document per (liveClass, student) pair. Attendance is only meaningful
// for things that have scheduled sessions — currently Course and Training,
// since LiveClass.itemType doesn't include "internship".
const attendanceSchema = new mongoose.Schema(
  {
    liveClassId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LiveClass",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent", "excused"],
      required: true,
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// A student can only have one attendance record per live class.
attendanceSchema.index({ liveClassId: 1, studentId: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
