import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products"; // Fallback to local data
import { ArrowRight, Ruler, Truck, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Try Firestore first
        const pRef = doc(db, "products", id);
        const pSnap = await getDoc(pRef);
        if (pSnap.exists()) {
          const data = { id: pSnap.id, ...pSnap.data() };
          setProduct(data);
          // If Firestore product has no sizes array, provide a default
          setSelectedSize(data.sizes?.[0] || "Free Size");
        } else {
          // Fallback to local data if not in Firestore (e.g. before seed)
          const local = getProductById(id);
          if (local) {
            setProduct(local);
            setSelectedSize(local.sizes?.[0] || "Free Size");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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
                  <button className="flex items-center gap-1 font-body text-[11px] text-charcoal/50 hover:text-charcoal transition-colors">
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
                  <p className="font-body text-xs text-charcoal/60 mt-1">Each piece is meticulously crafted by master artisans in our Haryana atelier.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
