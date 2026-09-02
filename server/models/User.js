import mongoose from "mongoose";
import bycrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
      required: function () {
        return this.authProvider === "local";
      },
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows many users with no googleId
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    purchasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    purchasedTrainings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Training",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
