import mongoose from "mongoose";

const enrollmentRequestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemType: {
      type: String,
      enum: ["course", "training"],
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemType",
    },
    itemTitle: {
      type: String,
      required: true, // snapshot of the course/training title at request time
    },
    amount: {
      type: Number,
      required: true, // snapshot of the price at request time
    },
    method: {
      type: String,
      enum: ["whatsapp", "razorpay"],
      required: true,
    },
    requestCode: {
      type: String,
      required: true,
      unique: true, // e.g. "QZ-482913" — shown to student, used in WhatsApp message, searched by admin
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
    batchTiming: {
      type: String,
    },
    paymentProof: {
      url: { type: String },
      publicId: { type: String },
    },
    confirmedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    confirmedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const EnrollmentRequest = mongoose.model("EnrollmentRequest", enrollmentRequestSchema);

export default EnrollmentRequest;