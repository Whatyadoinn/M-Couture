import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images, activeIndex, onClose, onNavigate }) {
  const isOpen = activeIndex !== null && activeIndex !== undefined;

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate((activeIndex - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, activeIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/95 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 text-white/80 hover:text-gold transition-colors"
          >
            <X size={30} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-8 text-white/70 hover:text-gold transition-colors"
          >
            <ChevronLeft size={34} />
          </button>

          <motion.img
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={images[activeIndex]}
            alt="Expanded gallery view"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex + 1) % images.length);
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-8 text-white/70 hover:text-gold transition-colors"
          >
            <ChevronRight size={34} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
