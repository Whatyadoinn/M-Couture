import { useState, useEffect } from "react";
import { collection, query, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { uploadImage } from "../lib/imageUpload";
import toast from "react-hot-toast";
import { Package, Plus, Image as ImageIcon, CheckCircle, Clock } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Product Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form, setForm] = useState({
    title: "", description: "", price: "", collection: "ready-to-wear", sku: "", image: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "products") {
        const snap = await getDocs(collection(db, "products"));
        setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else if (activeTab === "orders") {
        const snap = await getDocs(collection(db, "orders"));
        setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setImageFile(file);
    setUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setForm(prev => ({ ...prev, image: url }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        collection: form.collection,
        sku: form.sku,
        image: form.image,
        updatedAt: serverTimestamp()
      };

      if (currentProduct) {
        await updateDoc(doc(db, "products", currentProduct.id), productData);
        toast.success("Product updated");
      } else {
        productData.createdAt = serverTimestamp();
        await addDoc(collection(db, "products"), productData);
        toast.success("Product created");
      }
      setIsEditing(false);
      setCurrentProduct(null);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status });
      toast.success("Order status updated");
      fetchData();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl text-charcoal mb-8">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button 
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-body text-sm font-medium ${activeTab === "products" ? "border-b-2 border-gold text-gold-dark" : "text-gray-500 hover:text-gray-700"}`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 font-body text-sm font-medium ${activeTab === "orders" ? "border-b-2 border-gold text-gold-dark" : "text-gray-500 hover:text-gray-700"}`}
          >
            Orders
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        ) : (
          <>
            {/* Products Tab */}
            {activeTab === "products" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-body text-xl text-charcoal">Manage Products</h2>
                  <button 
                    onClick={() => {
                      setForm({ title: "", description: "", price: "", collection: "ready-to-wear", sku: "", image: "" });
                      setCurrentProduct(null);
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-2 bg-charcoal text-white px-4 py-2 text-sm font-body hover:bg-gold transition-colors"
                  >
                    <Plus size={16} /> New Product
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={saveProduct} className="bg-white p-6 shadow-sm border border-gray-200 mb-8 max-w-2xl">
                    <h3 className="font-display text-2xl mb-6">{currentProduct ? "Edit Product" : "New Product"}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-body text-gray-700 mb-1">Title</label>
                        <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border p-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-body text-gray-700 mb-1">Description</label>
                        <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border p-2" rows={3} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-body text-gray-700 mb-1">Price (₹)</label>
                          <input required type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full border p-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-body text-gray-700 mb-1">SKU</label>
                          <input required value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} className="w-full border p-2" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-body text-gray-700 mb-1">Collection</label>
                        <select value={form.collection} onChange={e => setForm({...form, collection: e.target.value})} className="w-full border p-2">
                          <option value="ready-to-wear">Ready to Wear</option>
                          <option value="bridal-couture">Bridal Couture</option>
                          <option value="trousseau">Trousseau</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-body text-gray-700 mb-1">Product Image</label>
                        <div className="flex items-center gap-4">
                          {form.image && (
                            <img src={form.image} alt="Preview" className="h-16 w-16 object-cover border" />
                          )}
                          <label className="cursor-pointer bg-gray-100 border border-gray-300 px-4 py-2 flex items-center gap-2 text-sm">
                            <ImageIcon size={16} />
                            {uploadingImage ? "Uploading..." : "Upload Photo"}
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={uploadingImage} />
                          </label>
                          <span className="text-xs text-gray-500">or paste URL:</span>
                          <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." className="flex-1 border p-2 text-sm" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <button type="submit" className="bg-charcoal text-white px-6 py-2 text-sm font-body hover:bg-gold transition-colors">Save</button>
                      <button type="button" onClick={() => setIsEditing(false)} className="border px-6 py-2 text-sm font-body text-gray-600 hover:bg-gray-50">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(p => (
                          <tr key={p.id}>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                              <img src={p.image} className="h-10 w-10 object-cover rounded bg-gray-100" alt="" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{p.title}</p>
                                <p className="text-xs text-gray-500">{p.sku}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{p.price?.toLocaleString('en-IN')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.collection}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button onClick={() => { setForm(p); setCurrentProduct(p); setIsEditing(true); }} className="text-gold-dark hover:text-charcoal mr-4">Edit</button>
                              <button onClick={async () => { if(confirm('Delete?')) { await deleteDoc(doc(db,"products",p.id)); fetchData(); } }} className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="font-body text-xl text-charcoal mb-6">Manage Orders</h2>
                <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order / Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map(o => (
                        <tr key={o.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-medium text-gray-900">#{o.id.slice(-6).toUpperCase()}</p>
                            <p className="text-xs text-gray-500">{o.createdAt?.toDate().toLocaleDateString()}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{o.shippingAddress?.name}</p>
                            <p className="text-xs text-gray-500">{o.shippingAddress?.email}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{o.totalAmount?.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${o.status==='delivered'?'bg-green-100 text-green-800': o.status==='shipped'?'bg-blue-100 text-blue-800':'bg-yellow-100 text-yellow-800'}`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <select 
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                              className="text-sm border-gray-300 rounded p-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
