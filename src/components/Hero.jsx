import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Background image with slow zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 22, ease: "linear" }}
      >
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop"
          alt="Editorial fashion portrait of a woman in luxury couture"
          className="h-full w-full object-cover object-top"
          loading="eager"
        />
      </motion.div>

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

      {/* Floating golden accents */}
      <motion.div
        className="absolute left-[8%] top-[22%] h-2 w-2 rounded-full bg-gold hidden md:block"
        animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[12%] top-[35%] h-3 w-3 rounded-full border border-gold hidden md:block"
        animate={{ y: [0, 22, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute right-[22%] bottom-[28%] h-1.5 w-1.5 rounded-full bg-gold-light hidden md:block"
        animate={{ y: [0, -14, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-5 font-body text-xs tracking-luxe text-gold-light uppercase"
        >
          Est. Panipat &mdash; House of Minky Narang
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05]"
        >
          M&apos;Couture
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="my-6 h-px w-20 bg-gold"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-xl font-body text-sm sm:text-base tracking-[0.15em] text-beige uppercase"
        >
          Luxury Women&apos;s Couture
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-5"
        >
          <Link
            to="/collections"
            className="group relative overflow-hidden border border-gold px-9 py-3.5 font-body text-xs tracking-luxe uppercase text-white transition-colors"
          >
            <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            <span className="transition-colors duration-500 group-hover:text-charcoal">
              Explore Collection
            </span>
          </Link>
          <Link
            to="/contact"
            className="border border-white/40 px-9 py-3.5 font-body text-xs tracking-luxe uppercase text-white transition-colors hover:border-gold hover:text-gold-light"
          >
            Book Consultation
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-gold-light" size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
