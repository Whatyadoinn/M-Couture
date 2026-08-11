import { motion } from "framer-motion";
import Reveal from "./Reveal";

// Replace these with real client data — names and image URLs
const clients = [
  {
    name: "Priya Sharma",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=100&w=3840&auto=format&fit=crop",
    occasion: "Bridal Couture",
  },
  {
    name: "Ananya Kapoor",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=100&w=3840&auto=format&fit=crop",
    occasion: "Reception Gown",
  },
  {
    name: "Meera Gupta",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=100&w=3840&auto=format&fit=crop",
    occasion: "Festive Wear",
  },
  {
    name: "Riya Malhotra",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=100&w=3840&auto=format&fit=crop",
    occasion: "Engagement Look",
  },
  {
    name: "Nisha Verma",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=100&w=3840&auto=format&fit=crop",
    occasion: "Trousseau",
  },
  {
    name: "Kavya Reddy",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=100&w=3840&auto=format&fit=crop",
    occasion: "Pre-Wedding",
  },
];

export default function OurClients() {
  return (
    <section className="bg-charcoal py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-body text-xs tracking-luxe text-gold-light uppercase">
            Our Muses
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-white">
            Our Clients
          </h2>
          <div className="mt-5 h-px w-16 bg-gold" />
          <p className="mt-6 max-w-xl font-body text-[15px] leading-relaxed text-white/60">
            Every creation begins with a story. Here are some of the incredible
            women who have trusted M'Couture to craft their most treasured
            moments.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              {/* Client Image */}
              <img
                src={client.image}
                alt={`${client.name} — ${client.occasion}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient overlay — always visible at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/30" />

              {/* Client info — pinned to bottom */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 translate-y-1 transition-transform duration-500 ease-out group-hover:translate-y-0">
                <div className="h-px w-8 bg-gold mb-3 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <h3 className="font-display text-lg sm:text-xl text-white leading-tight">
                  {client.name}
                </h3>
                <p className="mt-1 font-body text-[11px] tracking-widest uppercase text-gold-light/80">
                  {client.occasion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
