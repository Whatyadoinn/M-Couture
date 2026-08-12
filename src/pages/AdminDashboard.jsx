import { useState, useEffect, useMemo } from "react";
import { useData } from "../context/DataContext";
import { uploadImage } from "../lib/imageUpload";
import toast from "react-hot-toast";
import {
  Package, Plus, Image as ImageIcon, Star, StarOff, Trash2, Edit3,
  ShoppingBag, MapPin, Calendar, LayoutDashboard, Settings, X, Save,
  ChevronDown, Eye, Search, RefreshCw, Layers,
} from "lucide-react";

// ─── Shared Styles ─────────────────────────────────────────────────
const inputClass = "w-full border border-gray-300 rounded-lg p-2.5 text-sm font-body focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-colors";
const labelClass = "block text-xs font-body font-medium text-gray-600 mb-1.5 uppercase tracking-wider";
const btnPrimary = "bg-charcoal text-white px-5 py-2.5 text-xs font-body tracking-wider uppercase rounded-lg hover:bg-gold hover:text-charcoal transition-colors flex items-center gap-2";
const btnSecondary = "border border-gray-300 px-5 py-2.5 text-xs font-body text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2";
const btnDanger = "text-red-500 hover:text-red-700 transition-colors p-1.5 rounded hover:bg-red-50";
const cardClass = "bg-white rounded-xl border border-gray-200 shadow-sm";

const TABS = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "products", label: "Products", icon: Package },
  { key: "collections", label: "Collections", icon: Layers },
  { key: "bestsellers", label: "Bestsellers", icon: Star },
  { key: "orders", label: "Orders", icon: ShoppingBag },
  { key: "exhibitions", label: "Exhibitions", icon: MapPin },
  { key: "settings", label: "Site Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-charcoal">Admin Dashboard</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-gray-200 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-body whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.key
                  ? "border-gold text-gold-dark font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "collections" && <CollectionsTab />}
        {activeTab === "bestsellers" && <BestsellersTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "exhibitions" && <ExhibitionsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OVERVIEW TAB
   ═══════════════════════════════════════════════════════════════════ */
function OverviewTab() {
  const { products, orders, collections, exhibitions } = useData();
  const totalRevenue = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const featuredCount = products.filter((p) => p.featured).length;

  const stats = [
    { label: "Total Products", value: products.length, icon: Package },
    { label: "Collections", value: Object.keys(collections).length, icon: Layers },
    { label: "Orders", value: orders.length, icon: ShoppingBag },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: ShoppingBag },
    { label: "Pending Orders", value: pendingOrders, icon: ShoppingBag },
    { label: "Featured Items", value: featuredCount, icon: Star },
    { label: "Exhibitions", value: exhibitions.length, icon: MapPin },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className={`${cardClass} p-5`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center">
              <s.icon size={18} className="text-gold-dark" />
            </div>
          </div>
          <p className="font-display text-2xl text-charcoal">{s.value}</p>
          <p className="text-xs font-body text-gray-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PRODUCTS TAB
   ═══════════════════════════════════════════════════════════════════ */
function ProductsTab() {
  const { products, collections, addProduct, updateProduct, deleteProduct, toggleFeatured } = useData();
  const [editing, setEditing] = useState(null); // null | "new" | product object
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(q) || p.collection?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q));
  }, [products, search]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…" className={`${inputClass} pl-9`} />
        </div>
        <button onClick={() => setEditing("new")} className={btnPrimary}>
          <Plus size={16} /> New Product
        </button>
      </div>

      {editing !== null && (
        <ProductForm
          product={editing === "new" ? null : editing}
          collectionSlugs={Object.keys(collections)}
          onSave={(data) => {
            if (editing === "new") {
              addProduct(data);
              toast.success("Product created");
            } else {
              updateProduct(editing.id, data);
              toast.success("Product updated");
            }
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className={`${cardClass} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Collection</th>
                <th className="px-5 py-3 text-center text-[11px] font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="px-5 py-3 text-right text-[11px] font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.map((p) => {
                const img = p.image || p.images?.[0] || "";
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          {img && <img src={img} className="h-full w-full object-cover" alt="" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{p.title}</p>
                          <p className="text-[11px] text-gray-400">{p.sku || p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-sm text-gray-600">
                      ₹{p.price?.toLocaleString("en-IN")}
                      {p.comparePrice && <span className="text-xs text-gray-400 line-through ml-2">₹{p.comparePrice.toLocaleString("en-IN")}</span>}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600">{p.collection}</span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button onClick={() => toggleFeatured(p.id)} className="mx-auto">
                        {p.featured ? <Star size={18} className="text-gold fill-gold" /> : <StarOff size={18} className="text-gray-300 hover:text-gold transition-colors" />}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => setEditing(p)} className="p-1.5 text-gray-500 hover:text-charcoal hover:bg-gray-100 rounded transition-colors"><Edit3 size={15} /></button>
                        <button onClick={() => { if (confirm("Delete this product?")) { deleteProduct(p.id); toast.success("Deleted"); } }} className={btnDanger}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="text-center text-gray-400 text-sm py-12">No products found.</p>}
      </div>
    </div>
  );
}

/* ─── Product Form ──────────────────────────────────────────────── */
function ProductForm({ product, collectionSlugs, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    comparePrice: product?.comparePrice || "",
    collection: product?.collection || collectionSlugs[0] || "ready-to-wear",
    category: product?.category || "",
    sku: product?.sku || "",
    sizes: (product?.sizes || []).join(", "),
    images: (product?.images || (product?.image ? [product.image] : [])).join("\n"),
    inStock: product?.inStock !== false,
    featured: product?.featured || false,
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, images: f.images ? f.images + "\n" + url : url }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const images = form.images.split("\n").map((s) => s.trim()).filter(Boolean);
    onSave({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
      collection: form.collection,
      category: form.category,
      sku: form.sku,
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      images,
      image: images[0] || "",
      inStock: form.inStock,
      featured: form.featured,
    });
  };

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} p-6 mb-6`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl text-charcoal">{product ? "Edit Product" : "New Product"}</h3>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClass}>Title</label>
          <input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea required value={form.description} onChange={(e) => update("description", e.target.value)} className={`${inputClass} resize-none`} rows={3} />
        </div>
        <div>
          <label className={labelClass}>Price (₹)</label>
          <input required type="number" value={form.price} onChange={(e) => update("price", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Compare Price (₹)</label>
          <input type="number" value={form.comparePrice} onChange={(e) => update("comparePrice", e.target.value)} className={inputClass} placeholder="Optional" />
        </div>
        <div>
          <label className={labelClass}>Collection</label>
          <select value={form.collection} onChange={(e) => update("collection", e.target.value)} className={inputClass}>
            {collectionSlugs.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <input value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass} placeholder="e.g. Kurta Sets" />
        </div>
        <div>
          <label className={labelClass}>SKU</label>
          <input value={form.sku} onChange={(e) => update("sku", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Sizes (comma separated)</label>
          <input value={form.sizes} onChange={(e) => update("sizes", e.target.value)} className={inputClass} placeholder="XS, S, M, L, XL" />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Image URLs (one per line)</label>
          <textarea value={form.images} onChange={(e) => update("images", e.target.value)} className={`${inputClass} resize-none`} rows={3} placeholder="https://..." />
          <div className="mt-2 flex items-center gap-3">
            <label className="cursor-pointer text-xs font-body bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
              <ImageIcon size={14} /> {uploading ? "Uploading…" : "Upload Photo"}
              <input type="file" accept="image/*, .heic, .heif" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.inStock} onChange={(e) => update("inStock", e.target.checked)} className="rounded border-gray-300 text-gold focus:ring-gold" />
            <span className="text-sm font-body text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="rounded border-gray-300 text-gold focus:ring-gold" />
            <span className="text-sm font-body text-gray-700">Featured / Bestseller</span>
          </label>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button type="submit" className={btnPrimary}><Save size={14} /> Save Product</button>
        <button type="button" onClick={onCancel} className={btnSecondary}>Cancel</button>
      </div>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COLLECTIONS TAB
   ═══════════════════════════════════════════════════════════════════ */
function CollectionsTab() {
  const { collections, products, updateCollection, addCollection, deleteCollection } = useData();
  const [editing, setEditing] = useState(null); // slug | "new" | null
  const slugs = Object.keys(collections);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm font-body text-gray-500">{slugs.length} collections</p>
        <button onClick={() => setEditing("new")} className={btnPrimary}><Plus size={16} /> New Collection</button>
      </div>

      {editing !== null && (
        <CollectionForm
          slug={editing === "new" ? null : editing}
          data={editing === "new" ? null : collections[editing]}
          onSave={(slug, data) => {
            if (editing === "new") {
              addCollection(slug, data);
              toast.success("Collection created");
            } else {
              updateCollection(editing, data);
              toast.success("Collection updated");
            }
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slugs.map((slug) => {
          const c = collections[slug];
          const count = products.filter((p) => p.collection === slug).length;
          return (
            <div key={slug} className={`${cardClass} overflow-hidden group`}>
              <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                {c.image && <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-charcoal">{c.title}</h3>
                <p className="text-xs text-gray-500 font-body mt-1 line-clamp-2">{c.description}</p>
                <p className="text-xs text-gray-400 font-body mt-2">{count} products · slug: {slug}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setEditing(slug)} className={btnSecondary + " text-xs py-1.5 px-3"}><Edit3 size={13} /> Edit</button>
                  <button onClick={() => { if (confirm(`Delete "${c.title}"?`)) { deleteCollection(slug); toast.success("Deleted"); } }} className={btnDanger + " text-xs"}><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CollectionForm({ slug: existingSlug, data, onSave, onCancel }) {
  const [slug, setSlug] = useState(existingSlug || "");
  const [form, setForm] = useState({
    title: data?.title || "",
    description: data?.description || "",
    image: data?.image || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSlug = slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    onSave(finalSlug, form);
  };

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} p-6 mb-6`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg">{data ? "Edit Collection" : "New Collection"}</h3>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!existingSlug && (
          <div className="md:col-span-2">
            <label className={labelClass}>Slug (URL path)</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} className={inputClass} placeholder="e.g. bridal-couture" />
          </div>
        )}
        <div className="md:col-span-2">
          <label className={labelClass}>Title</label>
          <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={`${inputClass} resize-none`} rows={2} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Cover Image URL</label>
          <input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} className={inputClass} placeholder="https://..." />
          {form.image && <img src={form.image} alt="" className="mt-2 h-24 w-40 object-cover rounded-lg border" />}
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button type="submit" className={btnPrimary}><Save size={14} /> Save</button>
        <button type="button" onClick={onCancel} className={btnSecondary}>Cancel</button>
      </div>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ORDERS TAB
   ═══════════════════════════════════════════════════════════════════ */
function OrdersTab() {
  const { orders, updateOrderStatus, deleteOrder } = useData();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-body capitalize transition-colors ${filter === f ? "bg-charcoal text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {f} {f !== "all" && `(${orders.filter((o) => o.status === f).length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={`${cardClass} p-12 text-center`}>
          <ShoppingBag size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm font-body">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((o) => (
            <div key={o.id} className={`${cardClass} overflow-hidden`}>
              <div className="bg-gray-50 px-5 py-3 flex flex-wrap justify-between items-center gap-3 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-body">Order</p>
                    <p className="text-sm font-medium text-charcoal font-body">#{o.id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-body">Date</p>
                    <p className="text-sm text-charcoal font-body">{new Date(o.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-body">Total</p>
                    <p className="text-sm text-charcoal font-body font-medium">₹{o.totalAmount?.toLocaleString("en-IN")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-body font-medium capitalize ${statusColors[o.status] || "bg-gray-100 text-gray-800"}`}>
                    {o.status}
                  </span>
                  <select
                    value={o.status}
                    onChange={(e) => { updateOrderStatus(o.id, e.target.value); toast.success("Status updated"); }}
                    className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 font-body focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button onClick={() => { if (confirm("Delete?")) { deleteOrder(o.id); } }} className={btnDanger}><Trash2 size={14} /></button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-6 mb-3">
                  <div>
                    <p className="text-[11px] text-gray-400 font-body uppercase">Customer</p>
                    <p className="text-sm text-charcoal font-body">{o.shippingAddress?.name || "—"}</p>
                    <p className="text-xs text-gray-500 font-body">{o.shippingAddress?.email}</p>
                    <p className="text-xs text-gray-500 font-body">{o.shippingAddress?.phone}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-body uppercase">Shipping</p>
                    <p className="text-xs text-gray-600 font-body">{o.shippingAddress?.address}</p>
                    <p className="text-xs text-gray-600 font-body">{o.shippingAddress?.city}, {o.shippingAddress?.state} {o.shippingAddress?.pincode}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  {o.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm font-body">
                      <span className="text-gray-700">{item.quantity}× {item.title} <span className="text-gray-400">({item.size})</span></span>
                      <span className="text-gray-600">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EXHIBITIONS TAB
   ═══════════════════════════════════════════════════════════════════ */
function ExhibitionsTab() {
  const { exhibitions, addExhibition, updateExhibition, deleteExhibition } = useData();
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm font-body text-gray-500">{exhibitions.length} exhibitions</p>
        <button onClick={() => setEditing("new")} className={btnPrimary}><Plus size={16} /> Add Exhibition</button>
      </div>

      {editing !== null && (
        <ExhibitionForm
          exhibition={editing === "new" ? null : editing}
          onSave={(data) => {
            if (editing === "new") {
              addExhibition(data);
              toast.success("Exhibition added");
            } else {
              updateExhibition(editing.id, data);
              toast.success("Exhibition updated");
            }
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exhibitions.map((expo) => (
          <div key={expo.id} className={`${cardClass} overflow-hidden group`}>
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              {expo.image && <img src={expo.image} alt={expo.title} className="w-full h-full object-cover" />}
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg text-charcoal">{expo.title}</h3>
              <div className="mt-2 space-y-1.5">
                <p className="text-xs text-gray-500 font-body flex items-center gap-2"><Calendar size={13} /> {expo.date}</p>
                <p className="text-xs text-gray-500 font-body flex items-center gap-2"><MapPin size={13} /> {expo.location}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setEditing(expo)} className={btnSecondary + " text-xs py-1.5 px-3"}><Edit3 size={13} /> Edit</button>
                <button onClick={() => { if (confirm("Delete?")) { deleteExhibition(expo.id); toast.success("Deleted"); } }} className={btnDanger}><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExhibitionForm({ exhibition, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: exhibition?.title || "",
    date: exhibition?.date || "",
    location: exhibition?.location || "",
    image: exhibition?.image || "",
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); onSave(form); };
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      update("image", url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} p-6 mb-6`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg">{exhibition ? "Edit Exhibition" : "New Exhibition"}</h3>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2"><label className={labelClass}>Title</label><input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>Date</label><input required value={form.date} onChange={(e) => update("date", e.target.value)} className={inputClass} placeholder="e.g. October 12-14, 2026" /></div>
        <div><label className={labelClass}>Location</label><input required value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass} placeholder="Venue, City" /></div>
        <div className="md:col-span-2">
          <label className={labelClass}>Image</label>
          <div className="flex items-center gap-3">
            <input value={form.image} onChange={(e) => update("image", e.target.value)} className={inputClass} placeholder="https://..." />
            <label className="flex cursor-pointer whitespace-nowrap items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              <ImageIcon size={14} className="mr-2" /> {uploading ? "Uploading…" : "Upload"}
              <input type="file" accept="image/*, .heic, .heif" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          </div>
          {form.image && <img src={form.image} alt="" className="mt-2 h-20 w-32 object-cover rounded-lg border" />}
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button type="submit" className={btnPrimary} disabled={uploading}><Save size={14} /> Save</button>
        <button type="button" onClick={onCancel} className={btnSecondary}>Cancel</button>
      </div>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BESTSELLERS TAB
   ═══════════════════════════════════════════════════════════════════ */
function BestsellersTab() {
  const { bestsellerItems, addBestsellerItem, updateBestsellerItem, deleteBestsellerItem } = useData();
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm font-body text-gray-500">{bestsellerItems.length} bestsellers</p>
        <button onClick={() => setEditing("new")} className={btnPrimary}><Plus size={16} /> Add Bestseller</button>
      </div>

      {editing !== null && (
        <BestsellerForm
          item={editing === "new" ? null : editing}
          onSave={(data) => {
            if (editing === "new") {
              addBestsellerItem(data);
              toast.success("Bestseller added");
            } else {
              updateBestsellerItem(editing.id, data);
              toast.success("Bestseller updated");
            }
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {bestsellerItems.map((bs) => (
          <div key={bs.id} className={`${cardClass} overflow-hidden group`}>
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
              {bs.image && <img src={bs.image} alt={bs.title} className="w-full h-full object-cover" />}
            </div>
            <div className="p-4">
              <h3 className="font-display text-md text-charcoal">{bs.title}</h3>
              <p className="text-xs text-gray-500 font-body mt-1 uppercase tracking-wider">{bs.subtitle}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setEditing(bs)} className={btnSecondary + " text-xs py-1.5 px-3 flex-1 justify-center"}><Edit3 size={13} /> Edit</button>
                <button onClick={() => { if (confirm("Remove this bestseller?")) { deleteBestsellerItem(bs.id); toast.success("Removed"); } }} className={btnDanger}><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BestsellerForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: item?.title || "",
    subtitle: item?.subtitle || "",
    link: item?.link || "",
    image: item?.image || "",
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, image: url }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); onSave(form); };
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} p-6 mb-6`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg">{item ? "Edit Bestseller" : "New Bestseller"}</h3>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className={labelClass}>Title</label><input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} placeholder="e.g. Royal Red Lehenga" /></div>
        <div><label className={labelClass}>Subtitle</label><input required value={form.subtitle} onChange={(e) => update("subtitle", e.target.value)} className={inputClass} placeholder="e.g. bridal-couture" /></div>
        <div className="md:col-span-2"><label className={labelClass}>Link</label><input required value={form.link} onChange={(e) => update("link", e.target.value)} className={inputClass} placeholder="/product/id" /></div>
        <div className="md:col-span-2">
          <label className={labelClass}>Image URL</label>
          <div className="flex gap-2">
            <input value={form.image} onChange={(e) => update("image", e.target.value)} className={inputClass} placeholder="https://..." />
            <label className="cursor-pointer text-xs font-body bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg flex items-center justify-center min-w-[100px] hover:bg-gray-200 transition-colors">
              <ImageIcon size={14} className="mr-2" /> {uploading ? "..." : "Upload"}
              <input type="file" accept="image/*, .heic, .heif" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          </div>
          {form.image && <img src={form.image} alt="" className="mt-2 h-32 w-24 object-cover rounded-lg border" />}
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button type="submit" className={btnPrimary}><Save size={14} /> Save</button>
        <button type="button" onClick={onCancel} className={btnSecondary}>Cancel</button>
      </div>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SETTINGS TAB (Hero Banner + Reset)
   ═══════════════════════════════════════════════════════════════════ */
function SettingsTab() {
  const { heroData, updateHero, bestsellersData, updateBestsellersData, resetAllData } = useData();
  const [heroForm, setHeroForm] = useState({ ...heroData });
  const [bestsellersForm, setBestsellersForm] = useState({ ...bestsellersData });

  useEffect(() => { setHeroForm({ ...heroData }); }, [heroData]);
  useEffect(() => { setBestsellersForm({ ...bestsellersData }); }, [bestsellersData]);

  const handleHeroSave = (e) => {
    e.preventDefault();
    updateHero(heroForm);
    toast.success("Hero settings saved");
  };

  const handleBestsellersSave = (e) => {
    e.preventDefault();
    updateBestsellersData(bestsellersForm);
    toast.success("Bestsellers settings saved");
  };

  const updateHeroField = (k, v) => setHeroForm((f) => ({ ...f, [k]: v }));
  const updateHeroCta = (which, key, val) => {
    setHeroForm((f) => ({ ...f, [which]: { ...f[which], [key]: val } }));
  };
  const updateBestsellersField = (k, v) => setBestsellersForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <form onSubmit={handleHeroSave} className={`${cardClass} p-6`}>
        <h3 className="font-display text-xl text-charcoal mb-5">Hero Banner</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><label className={labelClass}>Title</label><input value={heroForm.title} onChange={(e) => updateHeroField("title", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Subtitle</label><input value={heroForm.subtitle} onChange={(e) => updateHeroField("subtitle", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Tagline</label><input value={heroForm.tagline} onChange={(e) => updateHeroField("tagline", e.target.value)} className={inputClass} /></div>
          <div className="md:col-span-2"><label className={labelClass}>Background Image URL</label><input value={heroForm.image} onChange={(e) => updateHeroField("image", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Primary CTA Label</label><input value={heroForm.ctaPrimary?.label || ""} onChange={(e) => updateHeroCta("ctaPrimary", "label", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Primary CTA Link</label><input value={heroForm.ctaPrimary?.link || ""} onChange={(e) => updateHeroCta("ctaPrimary", "link", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Secondary CTA Label</label><input value={heroForm.ctaSecondary?.label || ""} onChange={(e) => updateHeroCta("ctaSecondary", "label", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Secondary CTA Link</label><input value={heroForm.ctaSecondary?.link || ""} onChange={(e) => updateHeroCta("ctaSecondary", "link", e.target.value)} className={inputClass} /></div>
        </div>
        <div className="mt-5">
          <button type="submit" className={btnPrimary}><Save size={14} /> Save Hero Settings</button>
        </div>
      </form>

      {/* Bestsellers Section Settings */}
      <form onSubmit={handleBestsellersSave} className={`${cardClass} p-6`}>
        <h3 className="font-display text-xl text-charcoal mb-5">Bestsellers Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={labelClass}>Section Title</label><input value={bestsellersForm.title} onChange={(e) => updateBestsellersField("title", e.target.value)} className={inputClass} placeholder="e.g. Bestsellers" /></div>
          <div><label className={labelClass}>Subtitle</label><input value={bestsellersForm.subtitle} onChange={(e) => updateBestsellersField("subtitle", e.target.value)} className={inputClass} placeholder="e.g. Signature Silhouettes" /></div>
        </div>
        <div className="mt-5">
          <button type="submit" className={btnPrimary}><Save size={14} /> Save Bestsellers Settings</button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className={`${cardClass} p-6 border-red-200`}>
        <h3 className="font-display text-xl text-red-600 mb-2">Danger Zone</h3>
        <p className="text-sm font-body text-gray-500 mb-4">Reset all data back to defaults. This will erase all changes you've made to products, collections, orders, and exhibitions.</p>
        <button
          onClick={() => { if (confirm("Reset ALL data to defaults? This cannot be undone.")) { resetAllData(); toast.success("All data reset to defaults"); } }}
          className="bg-red-500 text-white px-5 py-2.5 text-xs font-body tracking-wider uppercase rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={14} /> Reset All Data
        </button>
      </div>
    </div>
  );
}
