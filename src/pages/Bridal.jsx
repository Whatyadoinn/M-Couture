import PageBanner from "../components/PageBanner";
import BridalShowcase from "../components/BridalShowcase";
import InstagramCTA from "../components/InstagramCTA";
import Reveal from "../components/Reveal";

export default function Bridal() {
  return (
    <>
      <PageBanner
        eyebrow="For Your Forever Day"
        title="Bridal Couture"
        description="Hand-embroidered ensembles crafted for every ceremony of your wedding story."
        image="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop"
      />

      <section className="bg-ivory py-24 px-6 lg:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal">
            An Ensemble for Every Ceremony
          </h2>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-charcoal/70">
            From the intimacy of the engagement to the grandeur of the
            reception, M&apos;Couture bridal wear is designed to carry you
            through every ceremony with grace — rich hand embroidery, luxe
            fabrics, and a fit that feels entirely your own.
          </p>
        </Reveal>
      </section>

      <BridalShowcase />
      <InstagramCTA />
    </>
  );
}
