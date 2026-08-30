import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    itemType: { type: String, enum: ["course", "training"], required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "itemModel" },
    itemModel: { type: String, enum: ["Course", "Training"], required: true },
    scheduledAt: { type: Date, required: true },
    durationMinutes: { type: Number, default: 60 },
    meetingLink: { type: String, required: true },
    recordingUrl: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("LiveClass", liveClassSchema);