import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useData } from "../context/DataContext";

export default function OrderConfirmation() {
  const { id } = useParams();
  const { orders } = useData();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = orders.find((o) => o.id === id);
    if (found) {
      setOrder(found);
    }
    setLoading(false);
  }, [id, orders]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-ivory">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-ivory text-center px-6">
        <h2 className="font-display text-3xl text-charcoal mb-4">Order Not Found</h2>
        <Link to="/" className="text-gold-dark hover:underline font-body text-sm uppercase tracking-widest">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-ivory py-32 px-6">
      <div className="mx-auto max-w-2xl bg-white border border-charcoal/10 p-8 md:p-12 text-center shadow-sm">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-6" strokeWidth={1} />
        
        <p className="font-body text-xs tracking-luxe text-gold-dark uppercase mb-4">
          Thank you for your order
        </p>
        <h1 className="font-display text-4xl text-charcoal mb-4">
          Payment Successful
        </h1>
        
        <p className="font-body text-sm text-charcoal/60 mb-8">
          Your order <strong className="text-charcoal font-medium">#{order.id.slice(-8).toUpperCase()}</strong> has been placed successfully. 
          We've sent a confirmation email to {order.shippingAddress?.email}.
        </p>

        <div className="border-y border-charcoal/10 py-6 mb-8 text-left">
          <h3 className="font-body text-sm uppercase tracking-widest text-charcoal mb-4">Order Details</h3>
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center mb-3 last:mb-0">
              <span className="font-body text-sm text-charcoal/80">
                {item.quantity}x {item.title} <span className="text-xs text-charcoal/50">({item.size})</span>
              </span>
              <span className="font-body text-sm text-charcoal font-medium">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-charcoal/10">
            <span className="font-body text-sm uppercase tracking-widest text-charcoal font-medium">Total Paid</span>
            <span className="font-display text-xl text-charcoal">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/account"
            className="border border-charcoal px-8 py-3.5 font-body text-xs tracking-luxe uppercase text-charcoal hover:bg-gold hover:border-gold transition-colors"
          >
            Track Order
          </Link>
          <Link
            to="/collections"
            className="bg-charcoal px-8 py-3.5 font-body text-xs tracking-luxe uppercase text-white hover:bg-gold hover:text-charcoal transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
