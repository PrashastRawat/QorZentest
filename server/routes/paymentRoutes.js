import express from "express";
import { getPaymentConfig, createOrder, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.get("/config", getPaymentConfig);
router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

export default router; 