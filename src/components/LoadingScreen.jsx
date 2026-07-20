import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-charcoal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <motion.span
              className="font-display text-gold text-6xl md:text-7xl"
              initial={{ letterSpacing: "0.6em", opacity: 0 }}
              animate={{ letterSpacing: "0.05em", opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              M
            </motion.span>
            <motion.div
              className="mt-4 h-px w-24 bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.p
              className="mt-4 font-body text-[11px] tracking-luxe text-beige uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              M&apos;Couture
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
