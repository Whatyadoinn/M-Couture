import { motion } from "framer-motion";
import { MessageCircle, Palette, Ruler, PackageCheck } from "lucide-react";
import { customProcessSteps } from "../data/siteData";
import Reveal from "./Reveal";

const icons = [MessageCircle, Palette, Ruler, PackageCheck];

export default function CustomProcess() {
  return (
    <section className="relative bg-charcoal py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-body text-xs tracking-luxe text-gold-light uppercase">
            The Atelier Process
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-white">
            Custom Couture, Tailored to You
          </h2>
          <p className="mt-5 font-body text-sm leading-relaxed text-beige/80">
            Every custom piece at M&apos;Couture is born from conversation and
            crafted by hand — a personal journey from first sketch to final
            stitch.
          </p>
        </Reveal>

        <div className="relative mt-20 grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting hairline for large screens */}
          <div className="pointer-events-none absolute left-0 right-0 top-[38px] hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />

          {customProcessSteps.map((step, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-charcoal">
                  <Icon size={26} className="text-gold" strokeWidth={1.4} />
                </div>
                <span className="mt-6 font-display text-sm text-gold-light tracking-widest">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-xl text-white">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[240px] font-body text-[13px] leading-relaxed text-beige/70">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
