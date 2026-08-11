import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function Internship() {
  return (
    <section className="bg-white py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-body text-xs tracking-luxe text-gold-dark uppercase">
            Join the Atelier
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-charcoal leading-tight">
            Internships at M'Couture
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-gold" />
          <p className="mt-8 font-body text-[15px] leading-relaxed text-charcoal/75">
            We are always on the lookout for passionate, driven individuals to join our team in Panipat. 
            An internship at M'Couture offers hands-on experience in luxury fashion design, 
            pattern making, hand embroidery techniques, and boutique management. 
            Work closely with our founder and skilled artisans to master the craft of couture.
          </p>
          <div className="mt-10">
            <a
              href="/contact"
              className="inline-block border border-gold bg-gold px-8 py-3 font-body text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-gold-dark hover:border-gold-dark"
            >
              Apply Now
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
