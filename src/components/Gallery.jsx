import { useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { galleryImages } from "../data/siteData";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="bg-beige py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-body text-xs tracking-luxe text-gold-dark uppercase">
            Editorial Moments
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-charcoal">
            Gallery
          </h2>
          <div className="mt-5 h-px w-16 bg-gold" />
        </Reveal>

        <div className="mt-16 columns-2 gap-4 sm:columns-3 lg:columns-4 [column-fill:balance]">
          {galleryImages.map((src, i) => (
            <motion.button
              key={src + i}
              onClick={() => setActiveIndex(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-4 block w-full overflow-hidden break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-4"
              aria-label="Open image in lightbox"
            >
              <img
                src={src}
                alt="M'Couture editorial fashion gallery image"
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-400 group-hover:bg-charcoal/50">
                <Expand
                  size={22}
                  className="text-white opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
