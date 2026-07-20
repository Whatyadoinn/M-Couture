import { motion } from "framer-motion";

export default function PageBanner({ eyebrow, title, description, image }) {
  return (
    <section className="relative flex h-[55vh] min-h-[380px] w-full items-center justify-center overflow-hidden bg-charcoal">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.15 }}
        transition={{ duration: 18, ease: "linear" }}
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-body text-xs tracking-luxe text-gold-light uppercase"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-white"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-5 max-w-xl font-body text-sm text-beige/80"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
