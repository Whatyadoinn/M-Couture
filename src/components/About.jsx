import { motion } from "framer-motion";
import Reveal from "./Reveal";
import founderImg from "../Images/Minky Narang.JPG";

export default function About() {
  return (
    <section className="bg-ivory py-28 px-6 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={founderImg}
              alt="Minky Narang, founder and designer at M'Couture"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden h-2/3 w-2/3 border border-gold sm:block" />
        </motion.div>

        <Reveal delay={0.1}>
          <p className="font-body text-xs tracking-luxe text-gold-dark uppercase">
            The Designer
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-charcoal leading-tight">
            Minky Narang
          </h2>
          <div className="mt-5 h-px w-16 bg-gold" />
          <p className="mt-6 font-body text-[15px] leading-relaxed text-charcoal/75">
            Nestled in the heart of Panipat, Haryana, M&apos;Couture is a premium
            boutique founded by designer Minky Narang, dedicated to the art
            of luxury women&apos;s couture. With an eye for refined
            silhouettes and a devotion to handcraft, Minky has built a house
            trusted for custom bridal wear, exquisite trousseau collections,
            graceful maternity wear, and elegant ready-to-wear.
          </p>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-charcoal/75">
            Every M&apos;Couture creation is a collaboration — between
            heritage craftsmanship and contemporary design, between the
            atelier and the woman who wears it. It is couture made personal.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-charcoal/10 pt-8">
            <div>
              <p className="font-display text-3xl text-gold-dark">7+</p>
              <p className="mt-1 font-body text-[11px] tracking-wide uppercase text-charcoal/60">
                Years of Craft
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-gold-dark">3000+</p>
              <p className="mt-1 font-body text-[11px] tracking-wide uppercase text-charcoal/60">
                Dresses Delivered
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-gold-dark">100%</p>
              <p className="mt-1 font-body text-[11px] tracking-wide uppercase text-charcoal/60">
                Handcrafted
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
