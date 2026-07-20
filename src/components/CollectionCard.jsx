import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CollectionCard({ title, description, image, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-beige">
        <img
          src={image}
          alt={`${title} — M'Couture by Minky Narang`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 border border-white/0 transition-all duration-500 group-hover:border-gold/60 group-hover:inset-3" />
      </div>

      <div className="mt-5 flex flex-col items-start">
        <h3 className="font-display text-2xl text-charcoal">{title}</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/70">
          {description}
        </p>
        <button className="mt-4 inline-flex items-center gap-1.5 border-b border-transparent font-body text-xs tracking-luxe uppercase text-gold-dark transition-all hover:border-gold-dark">
          Explore
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </motion.article>
  );
}
