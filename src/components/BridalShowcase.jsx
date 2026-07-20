import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { bridalShowcase } from "../data/siteData";
import Reveal from "./Reveal";

export default function BridalShowcase() {
  return (
    <section className="bg-ivory py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-body text-xs tracking-luxe text-gold-dark uppercase">
            The Bridal Edit
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-charcoal">
            Bridal Showcase
          </h2>
          <div className="mt-5 h-px w-16 bg-gold" />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:auto-rows-[220px] lg:gap-6">
          {bridalShowcase.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden ${item.span} ${
                i === 0 ? "col-span-2 row-span-2 md:col-span-1" : ""
              }`}
            >
              <img
                src={item.image}
                alt={`${item.title} — bridal couture by M'Couture`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-lg md:text-xl text-white">
                  {item.title}
                </h3>
                <span className="mt-1 block h-px w-0 bg-gold transition-all duration-500 group-hover:w-10" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            to="/bridal"
            className="border border-charcoal/30 px-9 py-3.5 font-body text-xs tracking-luxe uppercase text-charcoal transition-colors hover:border-gold hover:text-gold-dark"
          >
            View Full Bridal Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
