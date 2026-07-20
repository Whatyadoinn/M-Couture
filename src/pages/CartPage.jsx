import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import PageBanner from "../components/PageBanner";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <>
      <PageBanner
        eyebrow="Your Selection"
        title="Shopping Cart"
        description="Review your curated pieces before proceeding to checkout."
        image="https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=1600&auto=format&fit=crop"
      />
      
      <section className="bg-ivory py-20 px-6 lg:px-12 min-h-[50vh]">
        <div className="mx-auto max-w-6xl">
          {items.length === 0 ? (
            <div className="text-center py-20 bg-white border border-charcoal/10">
              <h3 className="font-display text-2xl text-charcoal mb-4">Your cart is empty</h3>
              <p className="font-body text-charcoal/60 mb-8">Discover our latest collections and find your perfect piece.</p>
              <Link to="/collections" className="inline-block bg-charcoal px-8 py-3.5 font-body text-xs tracking-luxe uppercase text-white hover:bg-gold hover:text-charcoal transition-colors">
                Explore Couture
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-charcoal/10 font-body text-xs tracking-widest uppercase text-charcoal/40">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>
                
                <div className="divide-y divide-charcoal/10">
                  {items.map((item, idx) => (
                    <div key={`${item.productId}-${item.size}-${idx}`} className="py-8 flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
                      <div className="col-span-6 flex items-center gap-6 w-full">
                        <div className="h-32 w-24 bg-beige shrink-0 overflow-hidden">
                          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-body text-[10px] tracking-widest uppercase text-gold-dark mb-1">{item.collection?.replace('-',' ')}</p>
                          <h4 className="font-display text-xl text-charcoal mb-1"><Link to={`/product/${item.productId}`}>{item.title}</Link></h4>
                          <p className="font-body text-sm text-charcoal/60 mb-2">Size: {item.size}</p>
                          <button 
                            onClick={() => removeFromCart(item.productId, item.size)}
                            className="font-body text-xs text-charcoal/40 hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-3 flex justify-center w-full md:w-auto">
                        <div className="flex items-center border border-charcoal/20">
                          <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)} className="p-3 text-charcoal/50 hover:text-charcoal transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="font-body text-sm w-8 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)} className="p-3 text-charcoal/50 hover:text-charcoal transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-3 text-right w-full md:w-auto">
                        <p className="font-body text-lg text-charcoal">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white border border-charcoal/10 p-8 sticky top-24">
                  <h3 className="font-display text-2xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Order Summary</h3>
                  
                  <div className="space-y-4 font-body text-sm text-charcoal/80 mb-6 border-b border-charcoal/10 pb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Complimentary</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-8">
                    <span className="font-body text-sm uppercase tracking-widest text-charcoal">Total</span>
                    <span className="font-display text-2xl text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <Link 
                    to="/checkout"
                    className="flex w-full items-center justify-center gap-2 bg-charcoal py-4 font-body text-xs tracking-luxe uppercase text-white hover:bg-gold hover:text-charcoal transition-colors"
                  >
                    Proceed to Checkout <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
