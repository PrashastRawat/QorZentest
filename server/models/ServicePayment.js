import mongoose from "mongoose";

// Tracks money earned from individual client Service projects
// (e.g. a one-off Web Design or SEO project), separate from the
// Service catalog model (which just lists services shown on the website).
const servicePaymentSchema = new mongoose.Schema(
  {
    // Which catalog service this project relates to (optional — admin can
    // also just type a free-text project title if it doesn't map 1:1)
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    projectTitle: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    // Client details — intentionally NOT "student" fields, since this is
    // a business/client engagement, not a student enrollment.
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    clientEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    clientPhone: {
      type: String,
      trim: true,
    },
    clientCompany: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount earned is required"],
      min: 0,
    },
    method: {
      type: String,
      enum: ["UPI", "Card", "NetBanking", "Cash", "BankTransfer", "Other"],
      default: "UPI",
    },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Refunded", "Failed"],
      default: "Paid",
    },
    // When the money was actually received — defaults to now, but admin
    // can backdate it for record-keeping.
    paidAt: {
      type: Date,
      default: Date.now,
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const ServicePayment = mongoose.model("ServicePayment", servicePaymentSchema);

export default ServicePayment;