import { useState, useEffect } from "react";
import { Package, MapPin, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import PageBanner from "../components/PageBanner";

export default function AccountPage() {
  const { user, signOut, isAdmin } = useAuth();
  const { orders: allOrders } = useData();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const userOrders = allOrders.filter(o => o.userId === user.uid || o.userId === "guest");
    userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setOrders(userOrders);
    setLoading(false);
  }, [user, allOrders]);

  return (
    <>
      <PageBanner
        eyebrow="Welcome Back"
        title={user?.displayName || user?.email?.split("@")[0] || "My Account"}
        description="Manage your orders, addresses, and personal details."
        image="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1600&auto=format&fit=crop"
      />
      
      <section className="bg-ivory py-20 px-6 lg:px-12">
        <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-charcoal/10 p-6">
              <div className="flex items-center gap-4 border-b border-charcoal/10 pb-6 mb-6">
                <div className="h-12 w-12 rounded-full bg-charcoal text-white flex items-center justify-center font-display text-xl">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-charcoal">{user?.displayName || user?.email?.split("@")[0] || "User"}</p>
                  <p className="font-body text-xs text-charcoal/60">{user?.email}</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                <li>
                  <button className="flex items-center gap-3 font-body text-sm text-charcoal hover:text-gold-dark transition-colors w-full text-left">
                    <Package size={16} /> My Orders
                  </button>
                </li>
                <li>
                  <button className="flex items-center gap-3 font-body text-sm text-charcoal/70 hover:text-gold-dark transition-colors w-full text-left">
                    <MapPin size={16} /> Saved Addresses
                  </button>
                </li>
                <li>
                  <button className="flex items-center gap-3 font-body text-sm text-charcoal/70 hover:text-gold-dark transition-colors w-full text-left">
                    <User size={16} /> Account Details
                  </button>
                </li>
                {isAdmin && (
                  <li className="pt-4 border-t border-charcoal/10 mt-4">
                     <a href="/admin" className="flex items-center gap-3 font-body text-sm text-gold-dark hover:text-charcoal transition-colors w-full text-left font-medium">
                        Admin Dashboard
                     </a>
                  </li>
                )}
                <li className="pt-4 mt-4">
                  <button onClick={signOut} className="flex items-center gap-3 font-body text-sm text-red-500 hover:text-red-700 transition-colors w-full text-left">
                    <LogOut size={16} /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content (Orders) */}
          <div className="lg:w-3/4">
            <h2 className="font-display text-2xl text-charcoal mb-6">Order History</h2>
            
            {loading ? (
              <div className="py-12 flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white border border-charcoal/10 p-12 text-center">
                <Package size={48} className="mx-auto text-charcoal/20 mb-4" />
                <h3 className="font-display text-xl text-charcoal mb-2">No orders yet</h3>
                <p className="font-body text-sm text-charcoal/60 mb-6">When you place an order, it will appear here.</p>
                <a href="/collections" className="inline-block border border-charcoal px-6 py-2.5 font-body text-xs tracking-luxe uppercase text-charcoal transition-colors hover:bg-gold hover:border-gold">
                  Start Shopping
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white border border-charcoal/10 overflow-hidden">
                    <div className="bg-charcoal/5 px-6 py-4 flex flex-wrap justify-between items-center border-b border-charcoal/10 gap-4">
                      <div>
                        <p className="font-body text-xs tracking-wider uppercase text-charcoal/50 mb-1">Order Placed</p>
                        <p className="font-body text-sm text-charcoal">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-body text-xs tracking-wider uppercase text-charcoal/50 mb-1">Total</p>
                        <p className="font-body text-sm text-charcoal">₹{order.totalAmount?.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="font-body text-xs tracking-wider uppercase text-charcoal/50 mb-1">Order ID</p>
                        <p className="font-body text-sm text-charcoal">#{order.id.slice(-6).toUpperCase()}</p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-xs ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex gap-4 mb-4 last:mb-0">
                          <div className="h-24 w-20 bg-beige overflow-hidden shrink-0">
                            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-display text-lg text-charcoal">{item.title}</h4>
                            <p className="font-body text-sm text-charcoal/60 mt-1">Size: {item.size}</p>
                            <p className="font-body text-sm text-charcoal/60">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-body text-sm text-charcoal">₹{item.price?.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </section>
    </>
  );
}
