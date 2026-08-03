import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";
import { ArrowRight, Ruler, Truck, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { getProductById } = useData();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const local = getProductById(id);
    if (local) {
      setProduct(local);
      setSelectedSize(local.sizes?.[0] || "Free Size");
    }
    setLoading(false);
  }, [id, getProductById]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart(product, selectedSize || "Free Size", 1);
    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ivory">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-ivory text-center px-6">
        <h2 className="font-display text-4xl text-charcoal mb-4">Product Not Found</h2>
        <p className="font-body text-charcoal/60 mb-8">The piece you are looking for is no longer available.</p>
        <Link to="/collections" className="border border-charcoal px-8 py-3 font-body text-xs tracking-luxe uppercase text-charcoal hover:bg-gold hover:border-gold transition-colors">
          Explore Collections
        </Link>
      </div>
    );
  }

  // Handle both single image (from admin) and multiple images (from local data)
  const images = product.images || (product.image ? [product.image] : []);

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-[11px] tracking-widest text-charcoal/40 uppercase mb-8">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/collections/${product.collection}`} className="hover:text-charcoal transition-colors">{product.collection.replace('-', ' ')}</Link>
          <span>/</span>
          <span className="text-charcoal">{product.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Product Images */}
          <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-24 w-20 shrink-0 overflow-hidden bg-beige border transition-colors ${selectedImage === idx ? 'border-gold' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="relative aspect-[3/4] w-full flex-1 bg-beige overflow-hidden">
              <img src={images[selectedImage]} alt={product.title} className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="font-body text-xs tracking-luxe text-gold-dark uppercase mb-4">
              M'Couture {product.category || 'Atelier'}
            </p>
            <h1 className="font-display text-4xl lg:text-5xl text-charcoal mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-body text-xl text-charcoal">₹{product.price?.toLocaleString('en-IN')}</span>
              {product.comparePrice && (
                <span className="font-body text-sm text-charcoal/40 line-through">₹{product.comparePrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            <p className="font-body text-sm leading-relaxed text-charcoal/70 mb-10">
              {product.description}
            </p>

            {/* Sizes */}
            {(product.sizes?.length > 0) && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body text-xs tracking-widest text-charcoal uppercase">Size</span>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 font-body text-[11px] text-charcoal/50 hover:text-charcoal transition-colors"
                  >
                    <Ruler size={14} /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border px-6 py-2.5 font-body text-sm transition-colors ${
                        selectedSize === size ? 'border-charcoal bg-charcoal text-white' : 'border-charcoal/20 text-charcoal hover:border-charcoal'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button 
              onClick={handleAddToCart}
              className="w-full bg-charcoal py-4 font-body text-xs tracking-luxe uppercase text-white hover:bg-gold hover:text-charcoal transition-colors flex items-center justify-center gap-2"
            >
              Add to Cart <ArrowRight size={16} />
            </button>

            {/* Guarantees */}
            <div className="mt-12 space-y-4 border-t border-charcoal/10 pt-8">
              <div className="flex items-start gap-4">
                <Truck size={20} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm text-charcoal">Global Shipping</p>
                  <p className="font-body text-xs text-charcoal/60 mt-1">Complimentary shipping within India. International delivery available.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck size={20} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm text-charcoal">Handcrafted Authenticity</p>
                  <p className="font-body text-xs text-charcoal/60 mt-1">Each piece is meticulously crafted by master artisans in our Panipat atelier.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-ivory p-8 md:p-12 shadow-2xl"
            >
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute right-6 top-6 p-2 text-charcoal/50 hover:text-charcoal transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
              
              <p className="font-body text-xs tracking-luxe text-gold-dark uppercase mb-2">Measurements</p>
              <h3 className="font-display text-3xl text-charcoal mb-8">Standard Size Guide</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body text-sm">
                  <thead>
                    <tr className="border-b border-charcoal/20">
                      <th className="py-4 font-medium text-charcoal uppercase tracking-widest text-xs">Size</th>
                      <th className="py-4 font-medium text-charcoal uppercase tracking-widest text-xs">UK/India</th>
                      <th className="py-4 font-medium text-charcoal uppercase tracking-widest text-xs">Bust (in)</th>
                      <th className="py-4 font-medium text-charcoal uppercase tracking-widest text-xs">Waist (in)</th>
                      <th className="py-4 font-medium text-charcoal uppercase tracking-widest text-xs">Hip (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/10 text-charcoal/70">
                    <tr className="hover:bg-beige/50 transition-colors">
                      <td className="py-4 font-medium text-charcoal">XS</td>
                      <td className="py-4">6 / 34</td>
                      <td className="py-4">32</td>
                      <td className="py-4">26</td>
                      <td className="py-4">36</td>
                    </tr>
                    <tr className="hover:bg-beige/50 transition-colors">
                      <td className="py-4 font-medium text-charcoal">S</td>
                      <td className="py-4">8 / 36</td>
                      <td className="py-4">34</td>
                      <td className="py-4">28</td>
                      <td className="py-4">38</td>
                    </tr>
                    <tr className="hover:bg-beige/50 transition-colors">
                      <td className="py-4 font-medium text-charcoal">M</td>
                      <td className="py-4">10 / 38</td>
                      <td className="py-4">36</td>
                      <td className="py-4">30</td>
                      <td className="py-4">40</td>
                    </tr>
                    <tr className="hover:bg-beige/50 transition-colors">
                      <td className="py-4 font-medium text-charcoal">L</td>
                      <td className="py-4">12 / 40</td>
                      <td className="py-4">38</td>
                      <td className="py-4">32</td>
                      <td className="py-4">42</td>
                    </tr>
                    <tr className="hover:bg-beige/50 transition-colors">
                      <td className="py-4 font-medium text-charcoal">XL</td>
                      <td className="py-4">14 / 42</td>
                      <td className="py-4">40</td>
                      <td className="py-4">34</td>
                      <td className="py-4">44</td>
                    </tr>
                    <tr className="hover:bg-beige/50 transition-colors">
                      <td className="py-4 font-medium text-charcoal">XXL</td>
                      <td className="py-4">16 / 44</td>
                      <td className="py-4">42</td>
                      <td className="py-4">36</td>
                      <td className="py-4">46</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-body text-[11px] text-charcoal/50 mt-6 leading-relaxed">
                * Note: These are standard body measurements. Actual garment measurements may vary depending on the silhouette and fit (e.g. relaxed fit vs tailored). For custom sizing, please contact us for a consultation.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
