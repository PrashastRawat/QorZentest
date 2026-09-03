import { Router} from "express";
import { signUp, signIn, getMe, adminLogin, googleAuth, logout } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";


const router = Router()

router.post("/signup", signUp);
router.post("/login", signIn)
router.post("/admin/login", adminLogin);
router.get("/me", protect, getMe);
router.post("/google", googleAuth);
router.post("/logout", logout);

export default router