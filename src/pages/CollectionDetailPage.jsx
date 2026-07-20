import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCollection, collectionsMeta } from "../data/products";
import PageBanner from "../components/PageBanner";
import CollectionCard from "../components/CollectionCard"; // We will modify this to support product mapping too or create a ProductCard. 
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Inline Product Card for collections page
function ProductCard({ id, title, price, image, images, index = 0 }) {
  const displayImage = image || (images && images[0]) || "";
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-beige">
          <img
            src={displayImage}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="mt-4 flex flex-col items-center text-center">
          <h3 className="font-display text-xl text-charcoal">{title}</h3>
          <p className="mt-1 font-body text-sm text-charcoal/60">₹{price?.toLocaleString('en-IN')}</p>
        </div>
      </Link>
    </motion.article>
  );
}

export default function CollectionDetailPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const meta = collectionsMeta[slug] || {
    title: slug.replace("-", " ").toUpperCase(),
    description: "Discover our exclusive couture.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fallback to local
        setProducts(getProductsByCollection(slug));
      } catch (err) {
        console.error(err);
        setProducts(getProductsByCollection(slug));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  return (
    <>
      <PageBanner
        eyebrow="The Edit"
        title={meta.title}
        description={meta.description}
        image={meta.image}
      />
      <section className="bg-ivory py-24 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-charcoal/60">No pieces available in this collection yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <ProductCard key={p.id} index={i} {...p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
