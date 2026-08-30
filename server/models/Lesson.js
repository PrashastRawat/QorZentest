import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: String,
    content: String,
    videoUrl: String,
    duration: Number, // in minutes
    order: Number,
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Lesson', lessonSchema);
