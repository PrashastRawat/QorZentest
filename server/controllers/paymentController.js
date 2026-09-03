import Razorpay from "razorpay";
import crypto from "crypto";
import EnrollmentRequest from "../models/EnrollmentRequest.js";
import { grantEnrollmentAccess } from "./enrollmentRequestController.js";

// RAZORPAY_ENABLED is an explicit admin kill-switch, separate from whether
// keys are configured — lets the team disable online payments (e.g. during
// setup or a gateway issue) without touching the actual key env vars.
// Defaults to enabled (unset or anything other than the literal "false")
// so existing deployments that never set this var keep working as before.
const razorpayExplicitlyDisabled = () =>
  process.env.RAZORPAY_ENABLED === "false";

const isRazorpayEnabled = () =>
  !razorpayExplicitlyDisabled() &&
  Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

// Lazily create the Razorpay instance only if keys exist AND the
// RAZORPAY_ENABLED kill-switch isn't off, so the server doesn't crash when
// keys aren't set yet and honors the explicit disable flag.
const getRazorpayInstance = () => {
  if (!isRazorpayEnabled()) {
    return null;
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// GET /api/payments/config
// Public — tells the frontend whether to show the Razorpay option at all.
// Frontend never needs its own env var for this: it always calls this
// endpoint at runtime, so flipping RAZORPAY_ENABLED on the server (and
// restarting) is enough — no frontend rebuild/redeploy required.
export const getPaymentConfig = (req, res) => {
  const enabled = isRazorpayEnabled();
  res.json({
    success: true,
    data: {
      razorpayEnabled: enabled,
      keyId: enabled ? process.env.RAZORPAY_KEY_ID : null, // Key ID is safe to expose, Key Secret never is
    },
  });
};

// POST /api/payments/create-order
// Body: { amount: <rupees, number>, enrollmentRequestId: <string> }
export const createOrder = async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();
    if (!razorpay) {
      return res
        .status(503)
        .json({ message: "Razorpay is not configured yet" });
    }

    const { amount, enrollmentRequestId } = req.body;
    if (!amount || !enrollmentRequestId) {
      return res
        .status(400)
        .json({ message: "amount and enrollmentRequestId are required" });
    }

    const request = await EnrollmentRequest.findById(enrollmentRequestId);
    if (!request) {
      return res.status(404).json({ message: "Enrollment request not found" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // rupees -> paise
      currency: "INR",
      receipt: request.requestCode,
    });

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

// POST /api/payments/verify
// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, enrollmentRequestId }

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      enrollmentRequestId,
    } = req.body;

    const orderId = razorpayOrderId ?? razorpay_order_id;
    const paymentId = razorpayPaymentId ?? razorpay_payment_id;
    const signature = razorpaySignature ?? razorpay_signature;

    if (!orderId || !paymentId || !signature || !enrollmentRequestId) {
      return res.status(400).json({ message: "Missing verification fields" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res
        .status(400)
        .json({ message: "Payment verification failed — signature mismatch" });
    }

    const request = await EnrollmentRequest.findById(enrollmentRequestId);
    if (!request) {
      return res.status(404).json({ message: "Enrollment request not found" });
    }

    if (request.status !== "confirmed") {
      request.status = "confirmed";
      request.confirmedAt = new Date();
      request.razorpayOrderId = orderId;
      request.razorpayPaymentId = paymentId;
      await request.save();

      await grantEnrollmentAccess(request);
    }

    res.json({ verified: true });
  } catch (err) {
    console.error("verifyPayment error:", err);
    res.status(500).json({ message: "Payment verification error" });
  }
};