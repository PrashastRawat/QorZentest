import { Router} from "express";
import { signUp, signIn, getMe, adminLogin } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";


const router = Router()

router.post("/signup", signUp);
router.post("/login", signIn)
router.post("/admin/login", adminLogin);
router.get("/me", protect, getMe);

export default router