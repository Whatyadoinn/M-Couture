require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");

const app = express();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use(cors());
app.use(express.json());

// Nodemailer Transporter Setup
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "mcouture.offical@gmail.com";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

// Helper to send emails
async function sendNotificationEmail({ subject, text, html }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("[Email Notification] SMTP credentials not set. Logging email content instead:");
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${text}`);
    return { success: true, logged: true };
  }

  const mailOptions = {
    from: `"M'Couture System" <${process.env.EMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[Email Notification] Email sent: " + info.response);
    return { success: true };
  } catch (error) {
    console.error("[Email Notification] Failed to send email:", error);
    throw error;
  }
}

app.get("/", (req, res) => {
  res.send("M'Couture backend is running");
});

// Create a Razorpay order (server-side — needed for signature verification)
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: "mc_" + Date.now(),
    });
    res.json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Verify Razorpay payment signature
app.post("/api/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    res.json({ verified: true });
  } else {
    res.status(400).json({ verified: false, error: "Signature mismatch" });
  }
});

// Send email notification for new order
app.post("/api/notify-order", async (req, res) => {
  try {
    const { order } = req.body;
    if (!order) {
      return res.status(400).json({ error: "Missing order details" });
    }

    const itemsList = order.items
      .map((item) => `- ${item.title} (Size: ${item.size}) x ${item.quantity} - ₹${item.price}`)
      .join("\n");

    const htmlItemsList = order.items
      .map(
        (item) =>
          `<li><strong>${item.title}</strong> (Size: ${item.size}) - ${item.quantity} x ₹${item.price.toLocaleString("en-IN")}</li>`
      )
      .join("");

    const subject = `[New Order] Order Placed by ${order.shippingAddress.name}`;
    const text = `A new order has been received!\n\n` +
      `Customer Name: ${order.shippingAddress.name}\n` +
      `Email: ${order.shippingAddress.email}\n` +
      `Phone: ${order.shippingAddress.phone}\n` +
      `Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}\n\n` +
      `Items:\n${itemsList}\n\n` +
      `Total Amount: ₹${order.totalAmount.toLocaleString("en-IN")}\n` +
      `Razorpay Payment ID: ${order.razorpayPaymentId || "Demo Payment"}`;

    const html = `
      <h3>New Order Placed!</h3>
      <p><strong>Customer details:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${order.shippingAddress.name}</li>
        <li><strong>Email:</strong> ${order.shippingAddress.email}</li>
        <li><strong>Phone:</strong> ${order.shippingAddress.phone}</li>
        <li><strong>Shipping Address:</strong> ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</li>
      </ul>
      <p><strong>Items Ordered:</strong></p>
      <ul>${htmlItemsList}</ul>
      <p><strong>Total Amount:</strong> ₹${order.totalAmount.toLocaleString("en-IN")}</p>
      <p><strong>Razorpay Payment ID:</strong> ${order.razorpayPaymentId || "Demo Payment"}</p>
    `;

    const result = await sendNotificationEmail({ subject, text, html });
    res.json({ success: true, ...result });
  } catch (err) {
    console.error("Notify order error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Send email notification for contact form enquiry
app.post("/api/enquiry", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const subject = `[New Enquiry] Message from ${name}`;
    const text = `You received a new message from the contact form:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`;

    const html = `
      <h3>New Customer Enquiry</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 3px solid #C8A96A; padding-left: 10px; font-style: italic;">
        ${message.replace(/\n/g, "<br>")}
      </blockquote>
    `;

    const result = await sendNotificationEmail({ subject, text, html });
    res.json({ success: true, ...result });
  } catch (err) {
    console.error("Enquiry notification error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;