/**
 * Razorpay payment handler.
 * Loads Razorpay checkout and resolves with payment response on success.
 */
export function initiateRazorpayPayment({
  amount, // in paise (INR * 100)
  currency = "INR",
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  description = "M'Couture Order",
}) {
  return new Promise((resolve, reject) => {
    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!keyId || keyId === "rzp_test_your_key_here") {
      // Demo mode — simulate a successful payment
      console.warn("[Razorpay] No key configured — using demo mode");
      setTimeout(() => {
        resolve({
          razorpay_payment_id: `demo_pay_${Date.now()}`,
          razorpay_order_id: orderId,
          razorpay_signature: "demo_signature",
          demo: true,
        });
      }, 1500);
      return;
    }

    if (typeof window.Razorpay === "undefined") {
      reject(new Error("Razorpay SDK not loaded. Check your internet connection."));
      return;
    }

    const options = {
      key: keyId,
      amount,
      currency,
      name: "M'Couture",
      description,
      order_id: orderId || undefined,
      prefill: {
        name: customerName || "",
        email: customerEmail || "",
        contact: customerPhone || "",
      },
      theme: {
        color: "#C8A96A",
      },
      handler: (response) => {
        resolve(response);
      },
      modal: {
        ondismiss: () => {
          reject(new Error("Payment cancelled by user"));
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
}
