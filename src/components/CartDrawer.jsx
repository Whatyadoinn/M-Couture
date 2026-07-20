import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { items, cartOpen, setCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {cartOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-ivory shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-charcoal/10">
              <h2 className="font-display text-2xl text-charcoal">Your Cart</h2>
              <button 
                onClick={() => setCartOpen(false)}
                className="p-2 text-charcoal/50 hover:text-charcoal transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="font-body text-charcoal/50 mb-6">Your cart is currently empty.</p>
                  <button 
                    onClick={() => {
                      setCartOpen(false);
                      navigate("/collections");
                    }}
                    className="border border-charcoal px-6 py-3 font-body text-xs tracking-luxe uppercase text-charcoal hover:bg-gold hover:border-gold transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, idx) => (
                    <div key={`${item.productId}-${item.size}-${idx}`} className="flex gap-4">
                      <div className="h-28 w-20 bg-beige shrink-0">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-display text-lg text-charcoal line-clamp-1 pr-2">{item.title}</h4>
                          <button onClick={() => removeFromCart(item.productId, item.size)} className="text-charcoal/40 hover:text-red-500 mt-1">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="font-body text-xs text-charcoal/60 mb-2">Size: {item.size}</p>
                        
                        <div className="mt-auto flex justify-between items-end">
                          <div className="flex items-center border border-charcoal/20">
                            <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)} className="px-2 py-1 text-charcoal/50 hover:text-charcoal">
                              <Minus size={12} />
                            </button>
                            <span className="font-body text-xs w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)} className="px-2 py-1 text-charcoal/50 hover:text-charcoal">
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="font-body text-sm font-medium text-charcoal">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-charcoal/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-body text-sm uppercase tracking-widest text-charcoal/60">Subtotal</span>
                  <span className="font-display text-2xl text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/checkout");
                  }}
                  className="flex w-full items-center justify-center gap-2 bg-charcoal py-4 font-body text-xs tracking-luxe uppercase text-white hover:bg-gold hover:text-charcoal transition-colors"
                >
                  Checkout <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/cart");
                  }}
                  className="mt-4 block w-full text-center font-body text-xs tracking-widest uppercase text-charcoal/60 hover:text-charcoal"
                >
                  View Cart
                </button>
              </div>
            )}
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}
