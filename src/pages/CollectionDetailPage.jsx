import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useCurrency } from "../context/CurrencyContext";
import PageBanner from "../components/PageBanner";
import CollectionCard from "../components/CollectionCard"; // We will modify this to support product mapping too or create a ProductCard. 

// Inline Product Card for collections page
function ProductCard({ id, title, price, image, images, index = 0 }) {
  const { formatPrice } = useCurrency();
  const displayImage = image || (images && images[0]) || "";
  
  return (
    <article className="group relative flex flex-col">
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-beige">
          <img
            src={displayImage}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-4 flex flex-col items-center text-center">
          <h3 className="font-display text-xl text-charcoal">{title}</h3>
          <p className="mt-1 font-body text-sm text-charcoal/60">{formatPrice(price)}</p>
        </div>
      </Link>
    </article>
  );
}

export default function CollectionDetailPage() {
  const { slug } = useParams();
  const { collections, getProductsByCollection } = useData();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const meta = collections[slug] || {
    title: slug.replace("-", " ").toUpperCase(),
    description: "Discover our exclusive couture.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=100&w=3840&auto=format&fit=crop"
  };

  useEffect(() => {
    setLoading(true);
    setProducts(getProductsByCollection(slug));
    setLoading(false);
  }, [slug, getProductsByCollection]);

  return (
    <>
      <PageBanner
        eyebrow="The Edit"
        title={meta.title}
        description={meta.description}
        image={meta.image}
        disableAnimation={true}
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
