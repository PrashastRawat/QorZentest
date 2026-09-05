import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User.js"
import Student from "../models/Student.js"

import { OAuth2Client } from "google-auth-library";
import { validateEmail } from "../utils/validateEmail.js";
import { sendPasswordResetEmail, sendPasswordChangedEmail, sendWelcomeEmail } from "../utils/sendEmail.js";
// Cookie-only auth: the JWT never touches the response body or localStorage.
// httpOnly blocks JS (and therefore XSS) from reading it; the browser just
// sends it back automatically on every request to our API origin.
const COOKIE_NAME = "qorzen_token";
const setAuthCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
export const signUp = async (req, res, next)=>{
    try {
        const {fullName, email, password} = req.body

        const emailCheck = await validateEmail(email);
        if (!emailCheck.valid) {
            const error = new Error(emailCheck.reason);
            error.statusCode = 400;
            throw error;
        }
        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({email: normalizedEmail})
        if(existingUser){
            const error = new Error("Email already exists");
            error.statusCode = 409
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({name: fullName, email: normalizedEmail, password: hashedPassword})
        await Student.create({ userId: newUser._id })

        // Fire-and-forget: don't make signup fail just because the mail
        // server hiccuped. Errors are only logged, never sent to the client.
        sendWelcomeEmail({ to: newUser.email, name: newUser.name }).catch((err) =>
            console.error("Failed to send welcome email:", err.message)
        );

        const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
        setAuthCookie(res, token);
        res.status(201).json({
            success: true,
            message:"User called successfully",
            data:{
                user:{
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

export const signIn = async (req,res,next)=>{
    try{
        const{email,password} = req.body;
        const user = await User.findOne({email}).select("+password");

        if(!user){
            const error = new Error("User not found")
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN,
        })

        setAuthCookie(res, token);

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data:{
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    authProvider: user.authProvider,
                    hasPassword: !!user.password,
                }
            }
        })
    }catch(error){
        next(error)
    }
}

export const getMe = async (req, res, next) => {
  try {
    // req.user (set by `protect`) doesn't include password (select:false),
    // so re-select it here just to derive the boolean below — the hash itself
    // never leaves this function.
    const user = await User.findById(req.user._id).select("+password");

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        authProvider: user.authProvider,
        hasPassword: !!user.password,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    if (user.role !== "admin") {
      const error = new Error("Access denied - admin only");
      error.statusCode = 403;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res, next) => {
  try {
    const { credential } = req.body; // the ID token from the frontend

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload(); // { email, name, sub, ... }

    let user = await User.findOne({ email: payload.email }).select("+password");

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        authProvider: "google",
        googleId: payload.sub,
      });
      await Student.create({ userId: user._id });
    } else if (!user.googleId) {
      // existing email/password user signing in with Google for the first time
      user.googleId = payload.sub;
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Signed in with Google",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          authProvider: user.authProvider,
          hasPassword: !!user.password,
        },
      },
    });
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

// PUT /api/auth/change-password  (protected)
// Handles BOTH cases with one endpoint:
//  - local user changing an existing password  -> currentPassword required, must match
//  - Google user setting a password for the first time -> currentPassword must be omitted
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      const error = new Error("New password must be at least 8 characters");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(req.user._id).select("+password");

    if (user.password) {
      // They already have a password (local user, or a Google user who set one
      // before) — the current one MUST be verified before we let them change it.
      if (!currentPassword) {
        const error = new Error("Current password is required");
        error.statusCode = 400;
        throw error;
      }
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        const error = new Error("Current password is incorrect");
        error.statusCode = 401;
        throw error;
      }
    }
    // else: Google user with no password yet — nothing to verify, this is a first-time set.

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    sendPasswordChangedEmail({ to: user.email, name: user.name }).catch((err) =>
      console.error("Failed to send password-changed email:", err.message)
    );

    res.status(200).json({
      success: true,
      message: user.password ? "Password updated successfully" : "Password set successfully",
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/forgot-password  { email }
// Always responds with the same generic message whether or not the email
// exists — otherwise this endpoint becomes a way to check which emails are
// registered ("user enumeration").
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const genericResponse = {
      success: true,
      message: "If an account exists for that email, a reset link has been sent.",
    };

    if (!email) return res.status(200).json(genericResponse);

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(200).json(genericResponse);
    }

    const rawToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password/${rawToken}`;

    try {
      await sendPasswordResetEmail({ to: user.email, name: user.name, resetUrl });
    } catch (emailError) {
      // Sending failed — don't leave a live token sitting around if the
      // person never actually got the link.
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      console.error("Failed to send reset email:", emailError.message);
      const error = new Error("Could not send reset email. Please try again later.");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json(genericResponse);
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/reset-password/:token  { newPassword }
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      const error = new Error("New password must be at least 8 characters");
      error.statusCode = 400;
      throw error;
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select("+password +resetPasswordToken +resetPasswordExpire");

    if (!user) {
      const error = new Error("Reset link is invalid or has expired");
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendPasswordChangedEmail({ to: user.email, name: user.name }).catch((err) =>
      console.error("Failed to send password-changed email:", err.message)
    );

    res.status(200).json({ success: true, message: "Password has been reset. You can now sign in." });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie(COOKIE_NAME, {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};