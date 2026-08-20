require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

const app = express();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer: store uploads in memory for Cloudinary streaming
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
  },
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

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("M'Couture backend is running");
});

// Upload payment screenshot for an order
app.post("/api/orders/:id/screenshot", upload.single("screenshot"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mcouture/payment-screenshots", public_id: `order_${id}_${Date.now()}` },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Save to Prisma
    try {
      await prisma.order.update({
        where: { id },
        data: { paymentScreenshotUrl: result.secure_url },
      });
    } catch (dbError) {
      console.warn("Could not update Prisma order (might not exist yet):", dbError.message);
    }

    res.json({ success: true, url: result.secure_url });
  } catch (err) {
    console.error("Screenshot upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Admin: verify (confirm/reject) an order
app.patch("/api/orders/:id/verify", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["confirmed", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Status must be 'confirmed' or 'rejected'" });
    }
    
    // Save to Prisma
    try {
      await prisma.order.update({
        where: { id: req.params.id },
        data: { status },
      });
    } catch (dbError) {
      console.warn("Could not update Prisma order:", dbError.message);
    }

    res.json({ success: true, orderId: req.params.id, status });
  } catch (err) {
    console.error("Order verify error:", err);
    res.status(500).json({ error: err.message });
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
      `Payment: UPI (screenshot uploaded)`;

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
      <p><strong>Payment:</strong> UPI (screenshot uploaded — please verify in admin dashboard)</p>
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`M'Couture backend running on port ${PORT}`);
});