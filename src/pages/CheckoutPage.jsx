import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { initiateRazorpayPayment } from "../lib/razorpay";
import { sanitizeForm, isValidPhone, isValidEmail } from "../lib/security";
import toast from "react-hot-toast";
import { ShieldCheck, ArrowRight, Lock } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user, userProfile } = useAuth();
  const { addOrder } = useData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: user?.email || "",
    name: userProfile?.displayName || "",
    phone: userProfile?.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

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
      // 1. Create mock order
      const mockOrderId = "mock_" + Math.random().toString(36).substr(2, 9);
      const orderData = {
        id: mockOrderId,
        userId: user ? user.uid : "guest",
        items,
        totalAmount: subtotal,
        shippingAddress: cleanForm,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      
      // Save to DataContext
      addOrder(orderData);

      // 2. Initiate Razorpay Payment
      try {
        const response = await initiateRazorpayPayment({
          amount: subtotal * 100, // in paise
          orderId: mockOrderId,
          customerName: cleanForm.name,
          customerEmail: cleanForm.email,
          customerPhone: cleanForm.phone,
        });
        
        // 3. Payment Success - Order is now processing
        // (In a real app, Razorpay webhook should confirm this on the backend too)
        
        toast.success("Payment successful!");
        clearCart();
        navigate(`/order-confirmation/${mockOrderId}`, { replace: true });
        
      } catch (payErr) {
        // Payment failed or cancelled
        toast.error(payErr.message || "Payment was cancelled or failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to process order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
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
            <div className="bg-white p-8 border border-charcoal/10 shadow-sm">
              <h2 className="font-body text-sm font-medium tracking-widest uppercase text-charcoal mb-6 border-b border-charcoal/10 pb-4">Contact Information</h2>
              <div className="space-y-5">
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (+91...)"
                  className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-8 border border-charcoal/10 shadow-sm">
              <h2 className="font-body text-sm font-medium tracking-widest uppercase text-charcoal mb-6 border-b border-charcoal/10 pb-4">Shipping Address</h2>
              <div className="space-y-5">
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none"
                />
                <input
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street Address (e.g. 123 Couture Lane, Apt 4B)"
                  className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-5">
                  <input
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none"
                  />
                  <input
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none"
                  />
                </div>
                <input
                  name="pincode"
                  required
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="PIN Code / Zip Code"
                  className="w-full border border-charcoal/15 bg-white py-3.5 px-4 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right: Summary */}
        <div className="lg:w-2/5">
          <div className="bg-white p-8 border border-charcoal/10 shadow-sm sticky top-24">
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
                    <p className="font-body text-sm text-charcoal">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 font-body text-sm text-charcoal/80 mb-6 border-b border-charcoal/10 pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-body text-base uppercase tracking-widest text-charcoal font-medium">Total</span>
              <span className="font-display text-2xl text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
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
                <>
                  Pay Now <ArrowRight size={14} />
                </>
              )}
            </button>
            <p className="font-body text-[10px] text-center text-charcoal/40 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={12} /> SSL Encrypted Checkout via Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
