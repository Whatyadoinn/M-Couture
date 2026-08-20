import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useCurrency } from "../context/CurrencyContext";
import { sanitizeForm, isValidPhone, isValidEmail } from "../lib/security";
import toast from "react-hot-toast";
import { ShieldCheck, ArrowRight, Lock, UploadCloud, CheckCircle } from "lucide-react";

// You can replace these with actual UPI details later
const UPI_ID = "minkynarang5-2@okicici";
const QR_CODE_URL = "/upi-qr.jpg"; 

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder, updateOrder } = useData();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: user?.email || "",
    name: user?.displayName || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!screenshot) {
      toast.error("Please upload a payment screenshot.");
      return;
    }

    const cleanForm = sanitizeForm(form);

    if (!isValidEmail(cleanForm.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!isValidPhone(cleanForm.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create Order in Firebase
      const orderRecord = {
        userId: user ? user.uid : "guest",
        items,
        totalAmount: subtotal,
        shippingAddress: cleanForm,
        status: "pending",
      };

      const firestoreId = await addOrder(orderRecord);

      // Step 2: Upload Screenshot to Backend
      const formData = new FormData();
      formData.append("screenshot", screenshot);

      const uploadRes = await fetch(`${API_URL}/api/orders/${firestoreId}/screenshot`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload screenshot. Please contact support.");
      }

      const uploadData = await uploadRes.json();
      
      // Step 3: Update Order with Screenshot URL in Firebase
      await updateOrder(firestoreId, { paymentScreenshotUrl: uploadData.url });

      // Notify admin via backend email service
      fetch(`${API_URL}/api/notify-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: { ...orderRecord, paymentScreenshotUrl: uploadData.url } }),
      }).catch((err) => console.error("Email notification trigger failed:", err));

      toast.success("Order submitted successfully!");
      clearCart();
      navigate(`/order-confirmation/${firestoreId}`, { replace: true });

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to process order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-12 flex flex-col lg:flex-row gap-12">
        
        {/* Left: Form */}
        <div className="lg:w-3/5">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-3xl text-charcoal">Checkout</h1>
            <div className="flex items-center gap-1 font-body text-xs text-charcoal/60 uppercase tracking-widest">
              <Lock size={12} /> Secure
            </div>
          </div>

          <form onSubmit={handleSubmit} id="checkout-form" className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white p-8 border border-charcoal/10">
              <h2 className="font-body text-sm font-medium tracking-widest uppercase text-charcoal mb-6 border-b border-charcoal/10 pb-4">Contact Information</h2>
              <div className="space-y-5">
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none transition-colors"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (+91...)"
                  className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-8 border border-charcoal/10">
              <h2 className="font-body text-sm font-medium tracking-widest uppercase text-charcoal mb-6 border-b border-charcoal/10 pb-4">Shipping Address</h2>
              <div className="space-y-5">
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none transition-colors"
                />
                <input
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none transition-colors"
                />
                <div className="grid grid-cols-2 gap-5">
                  <input
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none transition-colors"
                  />
                  <input
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <input
                  name="pincode"
                  required
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="PIN Code"
                  className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white p-8 border border-charcoal/10">
              <h2 className="font-body text-sm font-medium tracking-widest uppercase text-charcoal mb-6 border-b border-charcoal/10 pb-4">Payment</h2>
              <p className="font-body text-sm text-charcoal/70 mb-4">
                Please scan the QR code below or use our UPI ID to make the payment. Once done, upload a screenshot of your successful transaction.
              </p>
              
              <div className="flex flex-col items-center justify-center p-6 bg-ivory border border-charcoal/10 mb-6">
                <img src={QR_CODE_URL} alt="UPI QR Code" className="w-48 h-48 mb-4 border border-charcoal/10 p-2 bg-white" />
                <p className="font-display text-lg text-charcoal">{UPI_ID}</p>
              </div>

              <div>
                <label className="block text-sm font-body text-charcoal mb-2">Upload Payment Screenshot <span className="text-red-500">*</span></label>
                <label className={`flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed p-6 transition-all ${screenshot ? "border-green-500 bg-green-50" : "border-gray-300 bg-white hover:border-gold hover:bg-ivory"}`}>
                  <div className="flex flex-col items-center space-y-2">
                    {screenshot ? (
                      <>
                        <CheckCircle className="text-green-500" size={24} />
                        <span className="font-body text-sm text-green-700 font-medium">Selected: {screenshot.name}</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="text-gray-400" size={24} />
                        <span className="font-body text-sm text-gray-500">Click to upload screenshot</span>
                      </>
                    )}
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Summary */}
        <div className="lg:w-2/5">
          <div className="bg-white p-8 border border-charcoal/10 sticky top-24">
            <h2 className="font-body text-sm font-medium tracking-widest uppercase text-charcoal mb-6 border-b border-charcoal/10 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 no-scrollbar border-b border-charcoal/10 pb-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="relative h-16 w-12 bg-beige shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal/80 text-[10px] text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-display text-sm text-charcoal line-clamp-1">{item.title}</p>
                    <p className="font-body text-[10px] text-charcoal/50 uppercase">{item.size}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-body text-sm text-charcoal">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 font-body text-sm text-charcoal/80 mb-6 border-b border-charcoal/10 pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-body text-base uppercase tracking-widest text-charcoal font-medium">Total</span>
              <span className="font-display text-2xl text-charcoal">{formatPrice(subtotal)}</span>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-charcoal py-4 font-body text-xs tracking-luxe uppercase text-white hover:bg-gold hover:text-charcoal transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>Submit Order <ArrowRight size={14} /></>
              )}
            </button>
            <p className="font-body text-[10px] text-center text-charcoal/40 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={12} /> Verification requires up to 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
