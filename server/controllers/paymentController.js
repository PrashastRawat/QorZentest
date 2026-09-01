import Razorpay from "razorpay";
import crypto from "crypto";

// Lazily create the Razorpay instance only if keys exist,
// so the server doesn't crash when they're not set yet.
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return null;
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// GET /api/payments/config
// Public — tells the frontend whether to show the Razorpay option at all.
export const getPaymentConfig = (req, res) => {
  const enabled = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
  res.json({
    razorpayEnabled: enabled,
    keyId: enabled ? process.env.RAZORPAY_KEY_ID : null, // Key ID is safe to expose, Key Secret never is
  });
};

// POST /api/payments/create-order
// Body: { amount: <rupees, number>, requestCode: <string> }
export const createOrder = async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();
    if (!razorpay) {
      return res.status(503).json({ message: "Razorpay is not configured yet" });
    }

    const { amount, requestCode } = req.body;
    if (!amount || !requestCode) {
      return res.status(400).json({ message: "amount and requestCode are required" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // rupees -> paise
      currency: "INR",
      receipt: requestCode,
    });

    res.json(order);
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
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      enrollmentRequestId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !enrollmentRequestId) {
      return res.status(400).json({ message: "Missing verification fields" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed — signature mismatch" });
    }

    // Signature is valid -> payment is real.
    // TODO: call the same confirm logic used by confirmEnrollmentRequest,
    // passing enrollmentRequestId, so Student.enrolledCourses/enrolledTrainings
    // gets upserted exactly the same way as the WhatsApp/admin-confirm path.

    res.json({ verified: true });
  } catch (err) {
    console.error("verifyPayment error:", err);
    res.status(500).json({ message: "Payment verification error" });
  }
};