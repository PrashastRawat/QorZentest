import { Router} from "express";
import {
  signUp,
  signIn,
  getMe,
  adminLogin,
  googleAuth,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";


const router = Router()

router.post("/signup", signUp);
router.post("/login", signIn)
router.post("/admin/login", adminLogin);
router.get("/me", protect, getMe);
router.post("/google", googleAuth);
router.post("/logout", logout);

router.put("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router