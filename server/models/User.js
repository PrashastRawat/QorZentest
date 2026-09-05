import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

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
    // Set only while a reset/set-password link is outstanding.
    // We store a HASH of the token, never the raw token (same reason we hash passwords) —
    // if the DB ever leaked, the raw tokens in emails would still be useless to an attacker.
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
);

// Lets the frontend show "Set password" vs "Change password" without ever
// exposing the hash itself (password has select:false everywhere else).
userSchema.methods.matchPassword = async function (candidate) {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

// Generates a one-time reset token, stores only its SHA-256 hash + a 30-min
// expiry on the user doc, and returns the raw token (this is what goes in the email link).
userSchema.methods.createPasswordResetToken = function () {
  const rawToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
  return rawToken;
};

const User = mongoose.model("User", userSchema);

export default User;
