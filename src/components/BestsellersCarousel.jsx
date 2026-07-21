import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { useData } from "../context/DataContext";

export default function BestsellersCarousel() {
  const { bestsellerItems, bestsellersData } = useData();

  if (!bestsellerItems || bestsellerItems.length === 0) return null;
  return (
    <section className="bg-ivory py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 mb-16 text-center">
        <Reveal className="flex flex-col items-center">
          <p className="font-body text-xs tracking-luxe text-gold-dark uppercase">
            {bestsellersData?.subtitle || "Signature Silhouettes"}
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-charcoal">
            {bestsellersData?.title || "Bestsellers"}
          </h2>
          <div className="mt-5 h-px w-16 bg-gold" />
        </Reveal>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="relative flex overflow-x-hidden group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap gap-6 px-3"
        >
          {/* Double the array for seamless infinite scroll */}
          {[...bestsellerItems, ...bestsellerItems].map((item, index) => (
            <Link
              to={item.link || "#"}
              key={`${item.id}-${index}`}
              className="relative w-[280px] sm:w-[350px] flex-shrink-0 group/card cursor-pointer block"
            >
              <div className="aspect-[3/4] overflow-hidden bg-beige">
                <img
                  src={item.image || (item.images && item.images[0]) || ""}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-center translate-y-4 opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                <div className="bg-white/95 backdrop-blur-sm p-4 shadow-xl">
                  <h3 className="font-display text-lg text-charcoal">{item.title}</h3>
                  <p className="mt-1 font-body text-[10px] tracking-widest uppercase text-gold-dark">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 flex justify-center">
        <Link
          to="/collections"
          className="inline-block border border-charcoal px-9 py-3.5 font-body text-xs tracking-luxe uppercase text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
        >
          View All Collections
        </Link>
      </div>
    </section>
  );
}
