import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorHandler.js";
import serviceRoutes from "./routes/serviceRoutes.js"
import portfolioRoutes from "./routes/portfolioRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js"
import studentRoutes from './routes/studentRoutes.js';
import trainingRoutes from "./routes/trainingRoutes.js";
import enrollmentRequestRoutes from "./routes/enrollmentRequestRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import liveClassRoutes from "./routes/liveClassRoutes.js";


const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
});

app.use(limiter);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("QorZen API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes)
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/internships", internshipRoutes);
app.use('/api/student', studentRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/enrollment-requests", enrollmentRequestRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/live-classes", liveClassRoutes);

app.use(errorMiddleware);

export default app;